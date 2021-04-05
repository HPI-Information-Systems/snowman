import { AlgorithmValuesSoftKPIs } from './';

/**
 *
 * @export
 * @interface AlgorithmValues
 */
export interface AlgorithmValues {
  /**
   *
   * @type {string}
   * @memberof AlgorithmValues
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof AlgorithmValues
   */
  description?: string;
  /**
   *
   * @type {AlgorithmValuesSoftKPIs}
   * @memberof AlgorithmValues
   */
  softKPIs?: AlgorithmValuesSoftKPIs;
}
