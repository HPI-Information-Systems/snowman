import { SimilarityThresholdFunctionOperator } from './SimilarityThresholdFunctionOperator';

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
  operator?: SimilarityThresholdFunctionOperator;
}

/**
 * @export
 * @enum {string}
 */
export enum SimilarityThresholdFunctionValuesTypeEnum {
  SimilarityThreshold = 'SimilarityThreshold',
  Operator = 'Operator',
}
