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

/**
 * 
 * @export
 * @enum {string}
 */
export enum SoftKPIsAlgorithmEnum {
    DomainExpertise = 'domainExpertise',
    DomainHrAmount = 'domainHrAmount',
    DomainManhattanDistanceBasedEffort = 'domainManhattanDistanceBasedEffort',
    DomainHrAmountWeightedEffort = 'domainHrAmountWeightedEffort',
    DomainMultiplyEffort = 'domainMultiplyEffort',
    DomainExpertiseWeightedEffort = 'domainExpertiseWeightedEffort',
    MatchingSolutionExpertise = 'matchingSolutionExpertise',
    MatchingSolutionHrAmount = 'matchingSolutionHrAmount',
    MatchingSolutionManhattanDistanceBasedEffort = 'matchingSolutionManhattanDistanceBasedEffort',
    MatchingSolutionHrAmountWeightedEffort = 'matchingSolutionHrAmountWeightedEffort',
    MatchingSolutionMultiplyEffort = 'matchingSolutionMultiplyEffort',
    MatchingSolutionExpertiseWeightedEffort = 'matchingSolutionExpertiseWeightedEffort',
    GeneralCosts = 'generalCosts',
    InstallationExpertise = 'installationExpertise',
    InstallationHrAmount = 'installationHrAmount',
    InstallationManhattanDistanceBasedEffort = 'installationManhattanDistanceBasedEffort',
    InstallationHrAmountWeightedEffort = 'installationHrAmountWeightedEffort',
    InstallationMultiplyEffort = 'installationMultiplyEffort',
    InstallationExpertiseWeightedEffort = 'installationExpertiseWeightedEffort'
}

export function SoftKPIsAlgorithmEnumFromJSON(json: any): SoftKPIsAlgorithmEnum {
    return SoftKPIsAlgorithmEnumFromJSONTyped(json, false);
}

export function SoftKPIsAlgorithmEnumFromJSONTyped(json: any, ignoreDiscriminator: boolean): SoftKPIsAlgorithmEnum {
    return json as SoftKPIsAlgorithmEnum;
}

export function SoftKPIsAlgorithmEnumToJSON(value?: SoftKPIsAlgorithmEnum | null): any {
    return value as any;
}

