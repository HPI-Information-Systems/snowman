/**
 *
 * @export
 * @interface Metric
 */
export interface Metric {
  /**
   *
   * @type {string}
   * @memberof Metric
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof Metric
   */
  formula: string;
  /**
   *
   * @type {string}
   * @memberof Metric
   */
  info?: string;
  /**
   *
   * @type {string}
   * @memberof Metric
   */
  infoLink?: string;
  /**
   *
   * @type {number}
   * @memberof Metric
   */
  value: number;
  /**
   *
   * @type {Array<number>}
   * @memberof Metric
   */
  range: Array<number>;
}
