import { ExperimentConfigItemSimilarity } from './ExperimentConfigItemSimilarity';

/**
 *
 * @export
 * @interface ExperimentIntersectionItem
 */
export interface ExperimentIntersectionItem {
  /**
   *
   * @type {number}
   * @memberof ExperimentIntersectionItem
   */
  experimentId: number;
  /**
   *
   * @type {ExperimentConfigItemSimilarity}
   * @memberof ExperimentIntersectionItem
   */
  similarity?: ExperimentConfigItemSimilarity;
  /**
   *
   * @type {boolean}
   * @memberof ExperimentIntersectionItem
   */
  predictedCondition: boolean;
}
