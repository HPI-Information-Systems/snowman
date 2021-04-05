/**
 *
 * @export
 * @interface AlgorithmValuesSoftKPIs
 */
export interface AlgorithmValuesSoftKPIs {
  /**
   *
   * @type {string}
   * @memberof AlgorithmValuesSoftKPIs
   */
  implementationKnowHowLevel?: AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum;
  /**
   *
   * @type {string}
   * @memberof AlgorithmValuesSoftKPIs
   */
  matchingSolutionType?: AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum;
  /**
   *
   * @type {number}
   * @memberof AlgorithmValuesSoftKPIs
   */
  timeToInstall?: number;
  /**
   *
   * @type {number}
   * @memberof AlgorithmValuesSoftKPIs
   */
  timeToConfigure?: number;
}

/**
 * @export
 * @enum {string}
 */
export enum AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum {
  Starter = 'starter',
  Intermediate = 'intermediate',
  Expert = 'expert',
}
/**
 * @export
 * @enum {string}
 */
export enum AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum {
  Ml = 'ml',
  Rulebased = 'rulebased',
  Other = 'other',
}
