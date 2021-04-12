import { SimilarityThresholdFunctionOperator } from './SimilarityThresholdFunctionOperator';

/**
 *
 * @export
 * @interface SimilarityThresholdFunction
 */
export interface SimilarityThresholdFunction {
  /**
   *
   * @type {number}
   * @memberof SimilarityThresholdFunction
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof SimilarityThresholdFunction
   */
  type: SimilarityThresholdFunctionTypeEnum;
  /**
   *
   * @type {string}
   * @memberof SimilarityThresholdFunction
   */
  similarityThreshold?: string;
  /**
   *
   * @type {SimilarityThresholdOperator}
   * @memberof SimilarityThresholdFunction
   */
  operator?: SimilarityThresholdFunctionOperator;
}

/**
 * @export
 * @enum {string}
 */
export enum SimilarityThresholdFunctionTypeEnum {
  SimilarityThreshold = 'SimilarityThreshold',
  Operator = 'Operator',
}
