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
  /**
   *
   * @type {number}
   * @memberof SimilarityThresholdFunctionValues
   */
  constant?: number;
}

/**
 * @export
 * @enum {string}
 */
export enum SimilarityThresholdFunctionValuesTypeEnum {
  SimilarityThreshold = 'SimilarityThreshold',
  Operator = 'Operator',
  Constant = 'Constant',
}
