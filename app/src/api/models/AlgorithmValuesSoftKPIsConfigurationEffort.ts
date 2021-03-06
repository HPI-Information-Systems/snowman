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
 * @interface AlgorithmValuesSoftKPIsConfigurationEffort
 */
export interface AlgorithmValuesSoftKPIsConfigurationEffort {
    /**
     * 
     * @type {EffortParts}
     * @memberof AlgorithmValuesSoftKPIsConfigurationEffort
     */
    matchingSolution?: EffortParts;
    /**
     * 
     * @type {EffortParts}
     * @memberof AlgorithmValuesSoftKPIsConfigurationEffort
     */
    domain?: EffortParts;
    /**
     * 
     * @type {Array<string>}
     * @memberof AlgorithmValuesSoftKPIsConfigurationEffort
     */
    interfaces?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof AlgorithmValuesSoftKPIsConfigurationEffort
     */
    supportedOSs?: Array<string>;
}

export function AlgorithmValuesSoftKPIsConfigurationEffortFromJSON(json: any): AlgorithmValuesSoftKPIsConfigurationEffort {
    return AlgorithmValuesSoftKPIsConfigurationEffortFromJSONTyped(json, false);
}

export function AlgorithmValuesSoftKPIsConfigurationEffortFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlgorithmValuesSoftKPIsConfigurationEffort {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'matchingSolution': !exists(json, 'matchingSolution') ? undefined : EffortPartsFromJSON(json['matchingSolution']),
        'domain': !exists(json, 'domain') ? undefined : EffortPartsFromJSON(json['domain']),
        'interfaces': !exists(json, 'interfaces') ? undefined : json['interfaces'],
        'supportedOSs': !exists(json, 'supportedOSs') ? undefined : json['supportedOSs'],
    };
}

export function AlgorithmValuesSoftKPIsConfigurationEffortToJSON(value?: AlgorithmValuesSoftKPIsConfigurationEffort | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'matchingSolution': EffortPartsToJSON(value.matchingSolution),
        'domain': EffortPartsToJSON(value.domain),
        'interfaces': value.interfaces,
        'supportedOSs': value.supportedOSs,
    };
}


