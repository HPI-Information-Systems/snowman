/* tslint:disable */
/* eslint-disable */
/**
 * Snowman API
 * _This document describes the REST API of the snowman data matching benchmark tool._ Comparing data matching algorithms is still an unsolved topic in both industry and research. With snowman, developers and researchers will be able to compare the performance of different data matching solutions or improve new algorithms. 
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
     ExperimentConfigItem,
     ExperimentConfigItemFromJSON,
     ExperimentConfigItemToJSON,
     ExperimentIntersectionCount,
     ExperimentIntersectionCountFromJSON,
     ExperimentIntersectionCountToJSON,
     ExperimentIntersectionItem,
     ExperimentIntersectionItemFromJSON,
     ExperimentIntersectionItemToJSON,
     FileResponse,
     FileResponseFromJSON,
     FileResponseToJSON,
     InlineObject,
     InlineObjectFromJSON,
     InlineObjectToJSON,
     Metric,
     MetricFromJSON,
     MetricToJSON,
     MetricsEnum,
     MetricsEnumFromJSON,
     MetricsEnumToJSON,
     SoftKPIsAlgorithmEnum,
     SoftKPIsAlgorithmEnumFromJSON,
     SoftKPIsAlgorithmEnumToJSON,
     SoftKPIsExperimentEnum,
     SoftKPIsExperimentEnumFromJSON,
     SoftKPIsExperimentEnumToJSON,
 } from '../models';
 
 export interface CalculateDiagramDataRequest {
     xAxis: SoftKPIsAlgorithmEnum | MetricsEnum | SoftKPIsExperimentEnum;
     yAxis: SoftKPIsAlgorithmEnum | MetricsEnum | SoftKPIsExperimentEnum;
     diagram: InlineObject;
 }
 
 export interface CalculateExperimentIntersectionCountRequest {
     intersection: Array<ExperimentIntersectionItem>;
 }
 
 export interface CalculateExperimentIntersectionCountsRequest {
     experiments: Array<ExperimentConfigItem>;
 }
 
 export interface CalculateExperimentIntersectionRecordsRequest {
     intersection: Array<ExperimentIntersectionItem>;
     startAt?: number;
     limit?: number;
 }
 
 export interface GetBinaryMetricsRequest {
     groundTruthExperimentId: number;
     predictedExperimentId: number;
     groundTruthSimilarityThresholdFunction?: number;
     groundTruthSimilarityThreshold?: number;
     predictedSimilarityThresholdFunction?: number;
     predictedSimilarityThreshold?: number;
 }
 
 /**
  * 
  */
 export class BenchmarkApi extends runtime.BaseAPI {
 
     /**
      * returns diagram data based on two metrics and multiple experiments
      */
     async calculateDiagramDataRaw(requestParameters: CalculateDiagramDataRequest): Promise<runtime.ApiResponse<Array<object>>> {
         if (requestParameters.xAxis === null || requestParameters.xAxis === undefined) {
             throw new runtime.RequiredError('xAxis','Required parameter requestParameters.xAxis was null or undefined when calling calculateDiagramData.');
         }
 
         if (requestParameters.yAxis === null || requestParameters.yAxis === undefined) {
             throw new runtime.RequiredError('yAxis','Required parameter requestParameters.yAxis was null or undefined when calling calculateDiagramData.');
         }
 
         if (requestParameters.diagram === null || requestParameters.diagram === undefined) {
             throw new runtime.RequiredError('diagram','Required parameter requestParameters.diagram was null or undefined when calling calculateDiagramData.');
         }
 
         const queryParameters: any = {};
 
         if (requestParameters.xAxis !== undefined) {
             queryParameters['xAxis'] = requestParameters.xAxis;
         }
 
         if (requestParameters.yAxis !== undefined) {
             queryParameters['yAxis'] = requestParameters.yAxis;
         }
 
         const headerParameters: runtime.HTTPHeaders = {};
 
         headerParameters['Content-Type'] = 'application/json';
 
         const response = await this.request({
             path: `/benchmark/diagram`,
             method: 'POST',
             headers: headerParameters,
             query: queryParameters,
             body: InlineObjectToJSON(requestParameters.diagram),
         });
 
         return new runtime.JSONApiResponse<any>(response);
     }
 
     /**
      * returns diagram data based on two metrics and multiple experiments
      */
     async calculateDiagramData(requestParameters: CalculateDiagramDataRequest): Promise<Array<object>> {
         const response = await this.calculateDiagramDataRaw(requestParameters);
         return await response.value();
     }
 
     /**
      * Intersects multiple experiments and returns the count of pairs and the count of rows. This can be used to calculate the confusion-matrix.
      */
     async calculateExperimentIntersectionCountRaw(requestParameters: CalculateExperimentIntersectionCountRequest): Promise<runtime.ApiResponse<ExperimentIntersectionCount>> {
         if (requestParameters.intersection === null || requestParameters.intersection === undefined) {
             throw new runtime.RequiredError('intersection','Required parameter requestParameters.intersection was null or undefined when calling calculateExperimentIntersectionCount.');
         }
 
         const queryParameters: any = {};
 
         const headerParameters: runtime.HTTPHeaders = {};
 
         headerParameters['Content-Type'] = 'application/json';
 
         const response = await this.request({
             path: `/benchmark/experiment-intersection/count`,
             method: 'POST',
             headers: headerParameters,
             query: queryParameters,
             body: requestParameters.intersection.map(ExperimentIntersectionItemToJSON),
         });
 
         return new runtime.JSONApiResponse(response, (jsonValue) => ExperimentIntersectionCountFromJSON(jsonValue));
     }
 
     /**
      * Intersects multiple experiments and returns the count of pairs and the count of rows. This can be used to calculate the confusion-matrix.
      */
     async calculateExperimentIntersectionCount(requestParameters: CalculateExperimentIntersectionCountRequest): Promise<ExperimentIntersectionCount> {
         const response = await this.calculateExperimentIntersectionCountRaw(requestParameters);
         return await response.value();
     }
 
     /**
      * Returns the pair and row counts of all possible intersections of the given experiments.
      */
     async calculateExperimentIntersectionCountsRaw(requestParameters: CalculateExperimentIntersectionCountsRequest): Promise<runtime.ApiResponse<Array<ExperimentIntersectionCount>>> {
         if (requestParameters.experiments === null || requestParameters.experiments === undefined) {
             throw new runtime.RequiredError('experiments','Required parameter requestParameters.experiments was null or undefined when calling calculateExperimentIntersectionCounts.');
         }
 
         const queryParameters: any = {};
 
         const headerParameters: runtime.HTTPHeaders = {};
 
         headerParameters['Content-Type'] = 'application/json';
 
         const response = await this.request({
             path: `/benchmark/experiment-intersection/counts`,
             method: 'POST',
             headers: headerParameters,
             query: queryParameters,
             body: requestParameters.experiments.map(ExperimentConfigItemToJSON),
         });
 
         return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ExperimentIntersectionCountFromJSON));
     }
 
     /**
      * Returns the pair and row counts of all possible intersections of the given experiments.
      */
     async calculateExperimentIntersectionCounts(requestParameters: CalculateExperimentIntersectionCountsRequest): Promise<Array<ExperimentIntersectionCount>> {
         const response = await this.calculateExperimentIntersectionCountsRaw(requestParameters);
         return await response.value();
     }
 
     /**
      * intersects multiple experiments and returns the resulting records. This can be used to calculate the confusion-matrix.
      */
     async calculateExperimentIntersectionRecordsRaw(requestParameters: CalculateExperimentIntersectionRecordsRequest): Promise<runtime.ApiResponse<FileResponse>> {
         if (requestParameters.intersection === null || requestParameters.intersection === undefined) {
             throw new runtime.RequiredError('intersection','Required parameter requestParameters.intersection was null or undefined when calling calculateExperimentIntersectionRecords.');
         }
 
         const queryParameters: any = {};
 
         if (requestParameters.startAt !== undefined) {
             queryParameters['startAt'] = requestParameters.startAt;
         }
 
         if (requestParameters.limit !== undefined) {
             queryParameters['limit'] = requestParameters.limit;
         }
 
         const headerParameters: runtime.HTTPHeaders = {};
 
         headerParameters['Content-Type'] = 'application/json';
 
         const response = await this.request({
             path: `/benchmark/experiment-intersection/records`,
             method: 'POST',
             headers: headerParameters,
             query: queryParameters,
             body: requestParameters.intersection.map(ExperimentIntersectionItemToJSON),
         });
 
         return new runtime.JSONApiResponse(response, (jsonValue) => FileResponseFromJSON(jsonValue));
     }
 
     /**
      * intersects multiple experiments and returns the resulting records. This can be used to calculate the confusion-matrix.
      */
     async calculateExperimentIntersectionRecords(requestParameters: CalculateExperimentIntersectionRecordsRequest): Promise<FileResponse> {
         const response = await this.calculateExperimentIntersectionRecordsRaw(requestParameters);
         return await response.value();
     }
 
     /**
      * Compares two experiments and returns binary metrics
      */
     async getBinaryMetricsRaw(requestParameters: GetBinaryMetricsRequest): Promise<runtime.ApiResponse<Array<Metric>>> {
         if (requestParameters.groundTruthExperimentId === null || requestParameters.groundTruthExperimentId === undefined) {
             throw new runtime.RequiredError('groundTruthExperimentId','Required parameter requestParameters.groundTruthExperimentId was null or undefined when calling getBinaryMetrics.');
         }
 
         if (requestParameters.predictedExperimentId === null || requestParameters.predictedExperimentId === undefined) {
             throw new runtime.RequiredError('predictedExperimentId','Required parameter requestParameters.predictedExperimentId was null or undefined when calling getBinaryMetrics.');
         }
 
         const queryParameters: any = {};
 
         if (requestParameters.groundTruthExperimentId !== undefined) {
             queryParameters['groundTruthExperimentId'] = requestParameters.groundTruthExperimentId;
         }
 
         if (requestParameters.groundTruthSimilarityThresholdFunction !== undefined) {
             queryParameters['groundTruthSimilarityThresholdFunction'] = requestParameters.groundTruthSimilarityThresholdFunction;
         }
 
         if (requestParameters.groundTruthSimilarityThreshold !== undefined) {
             queryParameters['groundTruthSimilarityThreshold'] = requestParameters.groundTruthSimilarityThreshold;
         }
 
         if (requestParameters.predictedExperimentId !== undefined) {
             queryParameters['predictedExperimentId'] = requestParameters.predictedExperimentId;
         }
 
         if (requestParameters.predictedSimilarityThresholdFunction !== undefined) {
             queryParameters['predictedSimilarityThresholdFunction'] = requestParameters.predictedSimilarityThresholdFunction;
         }
 
         if (requestParameters.predictedSimilarityThreshold !== undefined) {
             queryParameters['predictedSimilarityThreshold'] = requestParameters.predictedSimilarityThreshold;
         }
 
         const headerParameters: runtime.HTTPHeaders = {};
 
         const response = await this.request({
             path: `/benchmark/metrics`,
             method: 'GET',
             headers: headerParameters,
             query: queryParameters,
         });
 
         return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(MetricFromJSON));
     }
 
     /**
      * Compares two experiments and returns binary metrics
      */
     async getBinaryMetrics(requestParameters: GetBinaryMetricsRequest): Promise<Array<Metric>> {
         const response = await this.getBinaryMetricsRaw(requestParameters);
         return await response.value();
     }
 
 }
 