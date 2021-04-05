import { ExperimentValuesSoftKPIs } from './';

/**
 *
 * @export
 * @interface Experiment
 */
export interface Experiment {
  /**
   *
   * @type {number}
   * @memberof Experiment
   */
  id: number;
  /**
   *
   * @type {number}
   * @memberof Experiment
   */
  numberOfUploadedRecords?: number;
  /**
   *
   * @type {string}
   * @memberof Experiment
   */
  name: string;
  /**
   *
   * @type {string}
   * @memberof Experiment
   */
  description?: string;
  /**
   *
   * @type {number}
   * @memberof Experiment
   */
  datasetId: number;
  /**
   *
   * @type {number}
   * @memberof Experiment
   */
  algorithmId: number;
  /**
   *
   * @type {ExperimentValuesSoftKPIs}
   * @memberof Experiment
   */
  softKPIs?: ExperimentValuesSoftKPIs;
}
