/* tslint:disable */
/* eslint-disable */
/**
 * Snowman API
 * _This document describes the REST API of the snowman data matching benchmark tool._ Comparing data matching algorithms is still an unsolved topic in both industry and research.  With snowman, developers and researchers will be able to compare the performance of different data matching  solutions or improve new algorithms. 
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: snowman@groups.sap.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    Experiment,
    ExperimentFromJSON,
    ExperimentToJSON,
    ExperimentValues,
    ExperimentValuesFromJSON,
    ExperimentValuesToJSON,
    FileResponse,
    FileResponseFromJSON,
    FileResponseToJSON,
} from '../models';

export interface AddExperimentRequest {
    experiment: ExperimentValues;
}

export interface DeleteExperimentRequest {
    experimentId: number;
}

export interface DeleteExperimentFileRequest {
    experimentId: number;
}

export interface GetExperimentRequest {
    experimentId: number;
}

export interface GetExperimentFileRequest {
    experimentId: number;
    startAt?: number;
    limit?: number;
    sortBy?: string;
}

export interface SetExperimentRequest {
    experimentId: number;
    experiment: ExperimentValues;
}

export interface SetExperimentFileRequest {
    experimentId: number;
    format: SetExperimentFileFormatEnum;
    file: Blob;
}

/**
 * 
 */
export class ExperimentsApi extends runtime.BaseAPI {

    /**
     * Creates a new Experiment
     */
    async addExperimentRaw(requestParameters: AddExperimentRequest): Promise<runtime.ApiResponse<number>> {
        if (requestParameters.experiment === null || requestParameters.experiment === undefined) {
            throw new runtime.RequiredError('experiment','Required parameter requestParameters.experiment was null or undefined when calling addExperiment.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/experiments`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ExperimentValuesToJSON(requestParameters.experiment),
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Creates a new Experiment
     */
    async addExperiment(requestParameters: AddExperimentRequest): Promise<number> {
        const response = await this.addExperimentRaw(requestParameters);
        return await response.value();
    }

    /**
     * Deletes an experiment (including experiment file)
     */
    async deleteExperimentRaw(requestParameters: DeleteExperimentRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.experimentId === null || requestParameters.experimentId === undefined) {
            throw new runtime.RequiredError('experimentId','Required parameter requestParameters.experimentId was null or undefined when calling deleteExperiment.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/experiments/{experimentId}`.replace(`{${"experimentId"}}`, encodeURIComponent(String(requestParameters.experimentId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes an experiment (including experiment file)
     */
    async deleteExperiment(requestParameters: DeleteExperimentRequest): Promise<void> {
        await this.deleteExperimentRaw(requestParameters);
    }

    /**
     * Deletes an experiment file
     */
    async deleteExperimentFileRaw(requestParameters: DeleteExperimentFileRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.experimentId === null || requestParameters.experimentId === undefined) {
            throw new runtime.RequiredError('experimentId','Required parameter requestParameters.experimentId was null or undefined when calling deleteExperimentFile.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/experiments/{experimentId}/file`.replace(`{${"experimentId"}}`, encodeURIComponent(String(requestParameters.experimentId))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Deletes an experiment file
     */
    async deleteExperimentFile(requestParameters: DeleteExperimentFileRequest): Promise<void> {
        await this.deleteExperimentFileRaw(requestParameters);
    }

    /**
     * Gets experiment by id
     */
    async getExperimentRaw(requestParameters: GetExperimentRequest): Promise<runtime.ApiResponse<Experiment>> {
        if (requestParameters.experimentId === null || requestParameters.experimentId === undefined) {
            throw new runtime.RequiredError('experimentId','Required parameter requestParameters.experimentId was null or undefined when calling getExperiment.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/experiments/{experimentId}`.replace(`{${"experimentId"}}`, encodeURIComponent(String(requestParameters.experimentId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ExperimentFromJSON(jsonValue));
    }

    /**
     * Gets experiment by id
     */
    async getExperiment(requestParameters: GetExperimentRequest): Promise<Experiment> {
        const response = await this.getExperimentRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get an experiment file
     */
    async getExperimentFileRaw(requestParameters: GetExperimentFileRequest): Promise<runtime.ApiResponse<FileResponse>> {
        if (requestParameters.experimentId === null || requestParameters.experimentId === undefined) {
            throw new runtime.RequiredError('experimentId','Required parameter requestParameters.experimentId was null or undefined when calling getExperimentFile.');
        }

        const queryParameters: any = {};

        if (requestParameters.startAt !== undefined) {
            queryParameters['startAt'] = requestParameters.startAt;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.sortBy !== undefined) {
            queryParameters['sortBy'] = requestParameters.sortBy;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/experiments/{experimentId}/file`.replace(`{${"experimentId"}}`, encodeURIComponent(String(requestParameters.experimentId))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => FileResponseFromJSON(jsonValue));
    }

    /**
     * Get an experiment file
     */
    async getExperimentFile(requestParameters: GetExperimentFileRequest): Promise<FileResponse> {
        const response = await this.getExperimentFileRaw(requestParameters);
        return await response.value();
    }

    /**
     * Get all experiments
     */
    async getExperimentsRaw(): Promise<runtime.ApiResponse<Array<Experiment>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/experiments`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ExperimentFromJSON));
    }

    /**
     * Get all experiments
     */
    async getExperiments(): Promise<Array<Experiment>> {
        const response = await this.getExperimentsRaw();
        return await response.value();
    }

    /**
     * Updates or creates an Experiment
     */
    async setExperimentRaw(requestParameters: SetExperimentRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.experimentId === null || requestParameters.experimentId === undefined) {
            throw new runtime.RequiredError('experimentId','Required parameter requestParameters.experimentId was null or undefined when calling setExperiment.');
        }

        if (requestParameters.experiment === null || requestParameters.experiment === undefined) {
            throw new runtime.RequiredError('experiment','Required parameter requestParameters.experiment was null or undefined when calling setExperiment.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/experiments/{experimentId}`.replace(`{${"experimentId"}}`, encodeURIComponent(String(requestParameters.experimentId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: ExperimentValuesToJSON(requestParameters.experiment),
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates or creates an Experiment
     */
    async setExperiment(requestParameters: SetExperimentRequest): Promise<void> {
        await this.setExperimentRaw(requestParameters);
    }

    /**
     * Updates or creates an experiment file
     */
    async setExperimentFileRaw(requestParameters: SetExperimentFileRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.experimentId === null || requestParameters.experimentId === undefined) {
            throw new runtime.RequiredError('experimentId','Required parameter requestParameters.experimentId was null or undefined when calling setExperimentFile.');
        }

        if (requestParameters.format === null || requestParameters.format === undefined) {
            throw new runtime.RequiredError('format','Required parameter requestParameters.format was null or undefined when calling setExperimentFile.');
        }

        if (requestParameters.file === null || requestParameters.file === undefined) {
            throw new runtime.RequiredError('file','Required parameter requestParameters.file was null or undefined when calling setExperimentFile.');
        }

        const queryParameters: any = {};

        if (requestParameters.format !== undefined) {
            queryParameters['format'] = requestParameters.format;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'text/csv';

        const response = await this.request({
            path: `/experiments/{experimentId}/file`.replace(`{${"experimentId"}}`, encodeURIComponent(String(requestParameters.experimentId))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.file as any,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Updates or creates an experiment file
     */
    async setExperimentFile(requestParameters: SetExperimentFileRequest): Promise<void> {
        await this.setExperimentFileRaw(requestParameters);
    }

}

/**
    * @export
    * @enum {string}
    */
export enum SetExperimentFileFormatEnum {
    Magellan = 'magellan',
    ClusterEr = 'clusterER',
    Pilot = 'pilot',
    Sigmod2021 = 'sigmod2021',
    Bhana = 'BHANA',
    Bpies = 'BPIES'
}
