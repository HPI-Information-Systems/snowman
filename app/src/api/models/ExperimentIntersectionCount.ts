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

import { exists, mapValues } from '../runtime';
import {
    ExperimentIntersectionItem,
    ExperimentIntersectionItemFromJSON,
    ExperimentIntersectionItemFromJSONTyped,
    ExperimentIntersectionItemToJSON,
} from './';

/**
 * 
 * @export
 * @interface ExperimentIntersectionCount
 */
export interface ExperimentIntersectionCount {
    /**
     * 
     * @type {number}
     * @memberof ExperimentIntersectionCount
     */
    numberRows: number;
    /**
     * 
     * @type {number}
     * @memberof ExperimentIntersectionCount
     */
    numberPairs: number;
    /**
     * 
     * @type {Array<ExperimentIntersectionItem>}
     * @memberof ExperimentIntersectionCount
     */
    experiments: Array<ExperimentIntersectionItem>;
}

export function ExperimentIntersectionCountFromJSON(json: any): ExperimentIntersectionCount {
    return ExperimentIntersectionCountFromJSONTyped(json, false);
}

export function ExperimentIntersectionCountFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExperimentIntersectionCount {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'numberRows': json['numberRows'],
        'numberPairs': json['numberPairs'],
        'experiments': ((json['experiments'] as Array<any>).map(ExperimentIntersectionItemFromJSON)),
    };
}

export function ExperimentIntersectionCountToJSON(value?: ExperimentIntersectionCount | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'numberRows': value.numberRows,
        'numberPairs': value.numberPairs,
        'experiments': ((value.experiments as Array<any>).map(ExperimentIntersectionItemToJSON)),
    };
}


