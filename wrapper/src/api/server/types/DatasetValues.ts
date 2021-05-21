/**
 *
 * @export
 * @interface DatasetValues
 */
export interface DatasetValues {
  /**
   *
   * @type {string}
   * @memberof DatasetValues
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof DatasetValues
   */
  description?: string;
  /**
   *
   * @type {number}
   * @memberof DatasetValues
   */
  numberOfRecords?: number;
  /**
   *
   * @type {Array<string>}
   * @memberof DatasetValues
   */
  tags?: Array<string>;
}
