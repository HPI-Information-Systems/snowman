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

/**
 * 
 * @export
 * @enum {string}
 */
export enum MetricsEnum {
    Similarity = 'similarity',
    FalseDiscoveryRate = 'falseDiscoveryRate',
    FalseNegativeRate = 'falseNegativeRate',
    FalseOmissionRate = 'falseOmissionRate',
    FalsePositiveRate = 'falsePositiveRate',
    NegativePredictiveValue = 'negativePredictiveValue',
    Precision = 'precision',
    PrevalenceThreshold = 'prevalenceThreshold',
    Recall = 'recall',
    Specificity = 'specificity',
    ThreatScore = 'threatScore',
    Accuracy = 'accuracy',
    BalancedAccuracy = 'balancedAccuracy',
    BookmakerInformedness = 'bookmakerInformedness',
    FStarScore = 'fStarScore',
    F1Score = 'f1Score',
    FowlkesMallowsIndex = 'fowlkesMallowsIndex',
    Markedness = 'markedness',
    MatthewsCorrelationCoefficient = 'matthewsCorrelationCoefficient'
}

export function MetricsEnumFromJSON(json: any): MetricsEnum {
    return MetricsEnumFromJSONTyped(json, false);
}

export function MetricsEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetricsEnum {
    return json as MetricsEnum;
}

export function MetricsEnumToJSON(value?: MetricsEnum | null): any {
    return value as any;
}

