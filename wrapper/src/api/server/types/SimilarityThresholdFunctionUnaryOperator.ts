import { SimilarityThresholdFunctionValues } from './SimilarityThresholdFunctionValues';

/**
 *
 * @export
 * @interface SimilarityThresholdFunctionUnaryOperator
 */
export interface SimilarityThresholdFunctionUnaryOperator {
  /**
   *
   * @type {SimilarityThresholdFunctionValues}
   * @memberof SimilarityThresholdFunctionUnaryOperator
   */
  func: SimilarityThresholdFunctionValues;
  /**
   *
   * @type {string}
   * @memberof SimilarityThresholdFunctionUnaryOperator
   */
  operator: SimilarityThresholdFunctionUnaryOperatorOperatorEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum SimilarityThresholdFunctionUnaryOperatorOperatorEnum {
  Acos = 'ACOS',
  Acosh = 'ACOSH',
  Asin = 'ASIN',
  Asinh = 'ASINH',
  Atan = 'ATAN',
  Atanh = 'ATANH',
  Ceil = 'CEIL',
  Ceiling = 'CEILING',
  Cos = 'COS',
  Cosh = 'COSH',
  Degrees = 'DEGREES',
  Exp = 'EXP',
  Floor = 'FLOOR',
  Ln = 'LN',
  Log = 'LOG',
  Log10 = 'LOG10',
  Log2 = 'LOG2',
  Radians = 'RADIANS',
  Sin = 'SIN',
  Sinh = 'SINH',
  Sqrt = 'SQRT',
  Tan = 'TAN',
  Tanh = 'TANH',
  Trunc = 'TRUNC',
}
