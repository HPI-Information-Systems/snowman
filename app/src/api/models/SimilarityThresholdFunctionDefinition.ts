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
    SimilarityThresholdFunctionOperator,
    SimilarityThresholdFunctionOperatorFromJSON,
    SimilarityThresholdFunctionOperatorFromJSONTyped,
    SimilarityThresholdFunctionOperatorToJSON,
    SimilarityThresholdFunctionUnaryOperator,
    SimilarityThresholdFunctionUnaryOperatorFromJSON,
    SimilarityThresholdFunctionUnaryOperatorFromJSONTyped,
    SimilarityThresholdFunctionUnaryOperatorToJSON,
} from './';

/**
 * 
 * @export
 * @interface SimilarityThresholdFunctionDefinition
 */
export interface SimilarityThresholdFunctionDefinition {
    /**
     * 
     * @type {string}
     * @memberof SimilarityThresholdFunctionDefinition
     */
    type: SimilarityThresholdFunctionDefinitionTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof SimilarityThresholdFunctionDefinition
     */
    similarityThreshold?: string;
    /**
     * 
     * @type {SimilarityThresholdFunctionOperator}
     * @memberof SimilarityThresholdFunctionDefinition
     */
    operator?: SimilarityThresholdFunctionOperator;
    /**
     * 
     * @type {number}
     * @memberof SimilarityThresholdFunctionDefinition
     */
    constant?: number;
    /**
     * 
     * @type {SimilarityThresholdFunctionUnaryOperator}
     * @memberof SimilarityThresholdFunctionDefinition
     */
    unaryOperator?: SimilarityThresholdFunctionUnaryOperator;
}

/**
* @export
* @enum {string}
*/
export enum SimilarityThresholdFunctionDefinitionTypeEnum {
    SimilarityThreshold = 'SimilarityThreshold',
    Operator = 'Operator',
    Constant = 'Constant',
    UnaryOperator = 'UnaryOperator'
}

export function SimilarityThresholdFunctionDefinitionFromJSON(json: any): SimilarityThresholdFunctionDefinition {
    return SimilarityThresholdFunctionDefinitionFromJSONTyped(json, false);
}

export function SimilarityThresholdFunctionDefinitionFromJSONTyped(json: any, ignoreDiscriminator: boolean): SimilarityThresholdFunctionDefinition {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'similarityThreshold': !exists(json, 'similarityThreshold') ? undefined : json['similarityThreshold'],
        'operator': !exists(json, 'operator') ? undefined : SimilarityThresholdFunctionOperatorFromJSON(json['operator']),
        'constant': !exists(json, 'constant') ? undefined : json['constant'],
        'unaryOperator': !exists(json, 'unaryOperator') ? undefined : SimilarityThresholdFunctionUnaryOperatorFromJSON(json['unaryOperator']),
    };
}

export function SimilarityThresholdFunctionDefinitionToJSON(value?: SimilarityThresholdFunctionDefinition | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'similarityThreshold': value.similarityThreshold,
        'operator': SimilarityThresholdFunctionOperatorToJSON(value.operator),
        'constant': value.constant,
        'unaryOperator': SimilarityThresholdFunctionUnaryOperatorToJSON(value.unaryOperator),
    };
}


