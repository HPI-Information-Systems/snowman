import { SimilarityThresholdOperator } from './';

/**
 *
 * @export
 * @interface SimilarityThresholdFunctionValues
 */
export interface SimilarityThresholdFunctionValues {
  /**
   *
   * @type {string}
   * @memberof SimilarityThresholdFunctionValues
   */
  type: SimilarityThresholdFunctionValuesTypeEnum;
  /**
   *
   * @type {string}
   * @memberof SimilarityThresholdFunctionValues
   */
  similarityThreshold?: string;
  /**
   *
   * @type {SimilarityThresholdOperator}
   * @memberof SimilarityThresholdFunctionValues
   */
  operator?: SimilarityThresholdOperator;
}

/**
 * @export
 * @enum {string}
 */
export enum SimilarityThresholdFunctionValuesTypeEnum {
  SimilarityThreshold = 'SimilarityThreshold',
  Operator = 'Operator',
}
