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
    EffortParts,
    EffortPartsFromJSON,
    EffortPartsFromJSONTyped,
    EffortPartsToJSON,
} from './';

/**
 * 
 * @export
 * @interface ExperimentValuesSoftKPIs
 */
export interface ExperimentValuesSoftKPIs {
    /**
     * 
     * @type {EffortParts}
     * @memberof ExperimentValuesSoftKPIs
     */
    effort?: EffortParts;
    /**
     * 
     * @type {number}
     * @memberof ExperimentValuesSoftKPIs
     */
    runtime?: number;
}

export function ExperimentValuesSoftKPIsFromJSON(json: any): ExperimentValuesSoftKPIs {
    return ExperimentValuesSoftKPIsFromJSONTyped(json, false);
}

export function ExperimentValuesSoftKPIsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExperimentValuesSoftKPIs {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'effort': !exists(json, 'effort') ? undefined : EffortPartsFromJSON(json['effort']),
        'runtime': !exists(json, 'runtime') ? undefined : json['runtime'],
    };
}

export function ExperimentValuesSoftKPIsToJSON(value?: ExperimentValuesSoftKPIs | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'effort': EffortPartsToJSON(value.effort),
        'runtime': value.runtime,
    };
}


