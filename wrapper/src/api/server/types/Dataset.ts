/**
 *
 * @export
 * @interface Dataset
 */
export interface Dataset {
  /**
   *
   * @type {number}
   * @memberof Dataset
   */
  id: number;
  /**
   *
   * @type {number}
   * @memberof Dataset
   */
  numberOfUploadedRecords?: number;
  /**
   *
   * @type {string}
   * @memberof Dataset
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof Dataset
   */
  description?: string;
  /**
   *
   * @type {number}
   * @memberof Dataset
   */
  numberOfRecords?: number;
  /**
   *
   * @type {Array<string>}
   * @memberof Dataset
   */
  tags?: Array<string>;
}
