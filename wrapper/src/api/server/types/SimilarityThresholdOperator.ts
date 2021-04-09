import { SimilarityThresholdFunctionValues } from './';

/**
 *
 * @export
 * @interface SimilarityThresholdOperator
 */
export interface SimilarityThresholdOperator {
  /**
   *
   * @type {SimilarityThresholdFunctionValues}
   * @memberof SimilarityThresholdOperator
   */
  left: SimilarityThresholdFunctionValues;
  /**
   *
   * @type {SimilarityThresholdFunctionValues}
   * @memberof SimilarityThresholdOperator
   */
  right: SimilarityThresholdFunctionValues;
  /**
   *
   * @type {string}
   * @memberof SimilarityThresholdOperator
   */
  operator: SimilarityThresholdOperatorOperatorEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum SimilarityThresholdOperatorOperatorEnum {
  Add = 'ADD',
  Subtract = 'SUBTRACT',
  Multiply = 'MULTIPLY',
  Divide = 'DIVIDE',
}
