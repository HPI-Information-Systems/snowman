import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { buildConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/builder';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

export const DecisionMatrixConfiguration = buildConfigurator({
  algorithms: {
    configuration: [
      StoreCacheKeyBaseEnum.algorithm,
      StoreCacheKeyBaseEnum.algorithm,
    ],
    position: 1,
    heading: '1. Select Matching Solutions',
  },
  metrics: {
    position: 2,
    heading:
      '2. (Optional) Select Experiments used to calculate average metrics',
    configuration: [
      {
        dataset: {
          configuration: StoreCacheKeyBaseEnum.dataset,
          position: 1,
          heading: 'Select Dataset',
        },
        groundTruth: {
          configuration: StoreCacheKeyBaseEnum.groundTruth,
          position: 2,
          heading: 'Select Ground Truth',
        },
        experiments: {
          configuration: [
            {
              experiment: {
                configuration: StoreCacheKeyBaseEnum.experiment,
                position: 1,
                heading: 'Select Experiment',
              },
              simFunction: {
                configuration: StoreCacheKeyBaseEnum.similarityFunction,
                position: 2,
                heading: '(Optional) Select Similarity Score and Threshold',
              },
              threshold: {
                configuration: StoreCacheKeyBaseEnum.similarityThreshold,
                position: 3,
              },
            },
            StoreCacheKeyBaseEnum.experiment,
          ],
          position: 3,
          heading: 'Select Experiments',
        },
      },
      StoreCacheKeyBaseEnum.dataset,
    ],
  },
});

const DecisionMatrixConfigurator = (): JSX.Element => (
  <GenericConfigurator
    cacheKey={DecisionMatrixConfiguration.cacheKey}
    strategyID={StrategyIDs.KpiDecisionMatrix}
  />
);

export default DecisionMatrixConfigurator;
