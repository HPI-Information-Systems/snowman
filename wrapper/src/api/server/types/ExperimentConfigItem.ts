import { ExperimentConfigItemSimilarity } from './ExperimentConfigItemSimilarity';

/**
 *
 * @export
 * @interface ExperimentConfigItem
 */
export interface ExperimentConfigItem {
  /**
   *
   * @type {number}
   * @memberof ExperimentConfigItem
   */
  experimentId: number;
  /**
   *
   * @type {ExperimentConfigItemSimilarity}
   * @memberof ExperimentConfigItem
   */
  similarity?: ExperimentConfigItemSimilarity;
}
