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
/**
 * 
 * @export
 * @interface DiagramCoordinates
 */
export interface DiagramCoordinates {
    /**
     * 
     * @type {Array<number>}
     * @memberof DiagramCoordinates
     */
    x?: Array<number>;
    /**
     * 
     * @type {Array<number>}
     * @memberof DiagramCoordinates
     */
    y?: Array<number>;
}

export function DiagramCoordinatesFromJSON(json: any): DiagramCoordinates {
    return DiagramCoordinatesFromJSONTyped(json, false);
}

export function DiagramCoordinatesFromJSONTyped(json: any, ignoreDiscriminator: boolean): DiagramCoordinates {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'x': !exists(json, 'x') ? undefined : json['x'],
        'y': !exists(json, 'y') ? undefined : json['y'],
    };
}

export function DiagramCoordinatesToJSON(value?: DiagramCoordinates | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'x': value.x,
        'y': value.y,
    };
}


