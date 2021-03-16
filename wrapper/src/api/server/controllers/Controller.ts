import stringify from 'csv-stringify';
import { Response } from 'express';

import { logger } from '../../tools/logger';
import { ErrorResponse, SuccessResponse } from '../services/Service';
import { Request } from '../types/util';

type RequestParameters = { [key: string]: unknown };

export class Controller {
  static sendResponse(
    response: Response,
    payload: SuccessResponse<unknown>
  ): void {
    /**
     * The default response-code is 200. We want to allow to change that. in That case,
     * payload will be an object consisting of a code and a payload. If not customized
     * send 200 and the payload as received in this method.
     */
    let responsePayload =
      payload.payload !== undefined ? payload.payload : payload;
    if (typeof responsePayload === 'number') {
      responsePayload = responsePayload.toString();
    }
    response.status(payload.code || 200).send(responsePayload);
  }

  static sendError(response: Response, error: ErrorResponse<unknown>): void {
    let payload = error.error;
    if (typeof payload === 'number') {
      payload = payload.toString();
    }
    logger.error((payload as string).toString());
    response.status(error.code || 500).send(payload);
  }

  static collectRequestParams<ParamsT extends RequestParameters>(
    request: Request
  ): ParamsT {
    const requestParams: RequestParameters = {};
    if (request.openapi.schema.requestBody) {
      if ('content' in request.openapi.schema.requestBody) {
        const { content } = request.openapi.schema.requestBody;
        if (content['application/json']) {
          requestParams['body'] = request.body;
        } else if (
          'multipart/form-data' in content &&
          content['multipart/form-data'].schema &&
          'properties' in content['multipart/form-data'].schema &&
          content['multipart/form-data'].schema.properties
        ) {
          Object.entries(
            content['multipart/form-data'].schema.properties
          ).forEach(([property, propertyObject]) => {
            if (
              !('format' in propertyObject) ||
              !(propertyObject.format === 'binary')
            ) {
              requestParams[property] = request.body[property];
            }
          });
        }
      }
    }
    if (request.openapi.schema.parameters) {
      request.openapi.schema.parameters.forEach((param) => {
        if ('in' in param) {
          if (param.in === 'path') {
            requestParams[param.name] = request.openapi.pathParams[param.name];
          } else if (param.in === 'query') {
            requestParams[param.name] = request.query[param.name];
          } else if (param.in === 'header') {
            requestParams[param.name] = request.headers[param.name];
          }
        }
      });
    }
    return (requestParams as unknown) as ParamsT;
  }

  static async handleRequest<ParamsT extends RequestParameters, ResponseT>(
    request: Request,
    response: Response,
    serviceOperation:
      | ((
          params: ParamsT,
          request: Request
        ) => Promise<SuccessResponse<ResponseT>>)
      | ((params: ParamsT) => Promise<SuccessResponse<ResponseT>>),
    options: {
      requestIsFile?: boolean;
    } = {}
  ): Promise<void> {
    try {
      let serviceResponse: SuccessResponse<ResponseT>;
      const params = this.collectRequestParams<ParamsT>(request);
      if ('requestIsFile' in options && options.requestIsFile) {
        serviceResponse = await serviceOperation(params, request);
      } else {
        serviceResponse = await (serviceOperation as (
          params: ParamsT
        ) => Promise<SuccessResponse<ResponseT>>)(params);
      }
      Controller.sendResponse(response, serviceResponse);
    } catch (error) {
      Controller.sendError(response, error);
    }
  }
}
