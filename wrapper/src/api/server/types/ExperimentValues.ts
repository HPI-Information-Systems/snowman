import { ExperimentValuesSoftKPIs } from './';

/**
 *
 * @export
 * @interface ExperimentValues
 */
export interface ExperimentValues {
  /**
   *
   * @type {string}
   * @memberof ExperimentValues
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof ExperimentValues
   */
  description?: string;
  /**
   *
   * @type {number}
   * @memberof ExperimentValues
   */
  datasetId: number;
  /**
   *
   * @type {number}
   * @memberof ExperimentValues
   */
  algorithmId: number;
  /**
   *
   * @type {ExperimentValuesSoftKPIs}
   * @memberof ExperimentValues
   */
  softKPIs?: ExperimentValuesSoftKPIs;
}
