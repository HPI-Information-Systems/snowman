import { ExperimentIntersectionItem } from './';

/**
 *
 * @export
 * @interface ExperimentIntersectionCount
 */
export interface ExperimentIntersectionCount {
  /**
   *
   * @type {number}
   * @memberof ExperimentIntersectionCount
   */
  numberRows: number;
  /**
   *
   * @type {number}
   * @memberof ExperimentIntersectionCount
   */
  numberPairs: number;
  /**
   *
   * @type {Array<ExperimentIntersectionItem>}
   * @memberof ExperimentIntersectionCount
   */
  experiments: Array<ExperimentIntersectionItem>;
}
