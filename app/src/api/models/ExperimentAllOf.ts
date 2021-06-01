/* tslint:disable */
/* eslint-disable */
/**
 * Snowman API
 * _This document describes the REST API of the snowman data matching benchmark tool._ Comparing data matching algorithms is still an unsolved topic in both industry and research. With snowman, developers and researchers will be able to compare the performance of different data matching solutions or improve new algorithms. 
 *
 * The version of the OpenAPI document: 3.0.0
 * Contact: snowman@groups.sap.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    Metric,
    MetricFromJSON,
    MetricFromJSONTyped,
    MetricToJSON,
} from './';

/**
 * 
 * @export
 * @interface ExperimentAllOf
 */
export interface ExperimentAllOf {
    /**
     * 
     * @type {number}
     * @memberof ExperimentAllOf
     */
    id: number;
    /**
     * 
     * @type {number}
     * @memberof ExperimentAllOf
     */
    numberOfUploadedRecords?: number;
    /**
     * 
     * @type {Array<Metric>}
     * @memberof ExperimentAllOf
     */
    effort?: Array<Metric>;
}

export function ExperimentAllOfFromJSON(json: any): ExperimentAllOf {
    return ExperimentAllOfFromJSONTyped(json, false);
}

export function ExperimentAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExperimentAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'numberOfUploadedRecords': !exists(json, 'numberOfUploadedRecords') ? undefined : json['numberOfUploadedRecords'],
        'effort': !exists(json, 'effort') ? undefined : ((json['effort'] as Array<any>).map(MetricFromJSON)),
    };
}

export function ExperimentAllOfToJSON(value?: ExperimentAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'numberOfUploadedRecords': value.numberOfUploadedRecords,
        'effort': value.effort === undefined ? undefined : ((value.effort as Array<any>).map(MetricToJSON)),
    };
}


