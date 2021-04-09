import { SimilarityThresholdFunctionValues } from './SimilarityThresholdFunctionValues';

/**
 *
 * @export
 * @interface SimilarityThresholdFunctionOperator
 */
export interface SimilarityThresholdFunctionOperator {
  /**
   *
   * @type {SimilarityThresholdFunctionValues}
   * @memberof SimilarityThresholdFunctionOperator
   */
  left: SimilarityThresholdFunctionValues;
  /**
   *
   * @type {SimilarityThresholdFunctionValues}
   * @memberof SimilarityThresholdFunctionOperator
   */
  right: SimilarityThresholdFunctionValues;
  /**
   *
   * @type {string}
   * @memberof SimilarityThresholdFunctionOperator
   */
  operator: SimilarityThresholdFunctionOperatorOperatorEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum SimilarityThresholdFunctionOperatorOperatorEnum {
  Add = 'ADD',
  Subtract = 'SUBTRACT',
  Multiply = 'MULTIPLY',
  Divide = 'DIVIDE',
}
