import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { buildConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/builder';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

export const BinaryMetricsConfiguration = buildConfigurator([
  {
    dataset: {
      configuration: StoreCacheKeyBaseEnum.dataset,
      heading: '1. Select Dataset',
      position: 1,
    },
    groundTruth: {
      configuration: StoreCacheKeyBaseEnum.groundTruth,
      heading: '2. Select Ground Truth',
      position: 2,
    },
    experiment: {
      configuration: [StoreCacheKeyBaseEnum.experiment],
      heading: '3. Select Experiment',
      position: 3,
    },
  },
]);

const BinaryMetricsConfigurator = (): JSX.Element => (
  <GenericConfigurator
    cacheKey={BinaryMetricsConfiguration.cacheKey}
    strategyID={StrategyIDs.BinaryMetrics}
  />
);

export default BinaryMetricsConfigurator;
