import {
  OpenApiRequest,
  OpenApiRequestMetadata,
} from 'express-openapi-validator/dist/framework/types';

export type Request = OpenApiRequest & { openapi: OpenApiRequestMetadata };
