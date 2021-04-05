import { AlgorithmValuesSoftKPIs } from './';

/**
 *
 * @export
 * @interface Algorithm
 */
export interface Algorithm {
  /**
   *
   * @type {number}
   * @memberof Algorithm
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof Algorithm
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof Algorithm
   */
  description?: string;
  /**
   *
   * @type {AlgorithmValuesSoftKPIs}
   * @memberof Algorithm
   */
  softKPIs?: AlgorithmValuesSoftKPIs;
}
