import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { buildConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/builder';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

export const IntersectionConfiguration = buildConfigurator([
  'first',
  {
    dataset: {
      configuration: StoreCacheKeyBaseEnum.dataset,
      heading: '1. Select Dataset',
      position: 1,
    },
    groundTruth: {
      configuration: StoreCacheKeyBaseEnum.groundTruth,
      heading: '2. (Optional) Select Ground Truth',
      position: 2,
    },
    experiments: {
      configuration: [StoreCacheKeyBaseEnum.experiment],
      heading: '3. Select Experiments',
      position: 3,
    },
  },
]);

const IntersectionConfigurator = (): JSX.Element => (
  <GenericConfigurator
    cacheKey={IntersectionConfiguration.cacheKey}
    strategyID={StrategyIDs.NaryIntersection}
  />
);

export default IntersectionConfigurator;
