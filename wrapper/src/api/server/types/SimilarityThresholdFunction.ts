import { SimilarityThresholdFunctionOperator } from './SimilarityThresholdFunctionOperator';
import { SimilarityThresholdFunctionUnaryOperator } from './SimilarityThresholdFunctionUnaryOperator';

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
  /**
   *
   * @type {number}
   * @memberof SimilarityThresholdFunction
   */
  constant?: number;
  /**
   *
   * @type {SimilarityThresholdFunctionUnaryOperator}
   * @memberof SimilarityThresholdFunction
   */
  unaryOperator?: SimilarityThresholdFunctionUnaryOperator;
}

/**
 * @export
 * @enum {string}
 */
export enum SimilarityThresholdFunctionTypeEnum {
  SimilarityThreshold = 'SimilarityThreshold',
  Operator = 'Operator',
  Constant = 'Constant',
  UnaryOperator = 'UnaryOperator',
}
