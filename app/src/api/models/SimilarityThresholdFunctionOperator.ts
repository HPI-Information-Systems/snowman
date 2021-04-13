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

import { exists, mapValues } from '../runtime';
import {
    SimilarityThresholdFunctionValues,
    SimilarityThresholdFunctionValuesFromJSON,
    SimilarityThresholdFunctionValuesFromJSONTyped,
    SimilarityThresholdFunctionValuesToJSON,
} from './';

/**
 * 
 * @export
 * @interface SimilarityThresholdFunctionOperator
 */
export interface SimilarityThresholdFunctionOperator {
    /**
     * 
     * @type {SimilarityThresholdFunctionValues}
     * @memberof SimilarityThresholdFunctionOperator
     */
    left: SimilarityThresholdFunctionValues;
    /**
     * 
     * @type {SimilarityThresholdFunctionValues}
     * @memberof SimilarityThresholdFunctionOperator
     */
    right: SimilarityThresholdFunctionValues;
    /**
     * 
     * @type {string}
     * @memberof SimilarityThresholdFunctionOperator
     */
    operator: SimilarityThresholdFunctionOperatorOperatorEnum;
}

/**
* @export
* @enum {string}
*/
export enum SimilarityThresholdFunctionOperatorOperatorEnum {
    Add = 'ADD',
    Subtract = 'SUBTRACT',
    Multiply = 'MULTIPLY',
    Divide = 'DIVIDE',
    Power = 'POWER',
    Pow = 'POW',
    Atan2 = 'ATAN2',
    Log = 'LOG',
    Mod = 'MOD'
}

export function SimilarityThresholdFunctionOperatorFromJSON(json: any): SimilarityThresholdFunctionOperator {
    return SimilarityThresholdFunctionOperatorFromJSONTyped(json, false);
}

export function SimilarityThresholdFunctionOperatorFromJSONTyped(json: any, ignoreDiscriminator: boolean): SimilarityThresholdFunctionOperator {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'left': SimilarityThresholdFunctionValuesFromJSON(json['left']),
        'right': SimilarityThresholdFunctionValuesFromJSON(json['right']),
        'operator': json['operator'],
    };
}

export function SimilarityThresholdFunctionOperatorToJSON(value?: SimilarityThresholdFunctionOperator | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'left': SimilarityThresholdFunctionValuesToJSON(value.left),
        'right': SimilarityThresholdFunctionValuesToJSON(value.right),
        'operator': value.operator,
    };
}


