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
});

const DecisionMatrixConfigurator = (): JSX.Element => (
  <GenericConfigurator
    cacheKey={DecisionMatrixConfiguration.cacheKey}
    strategyID={StrategyIDs.KpiDecisionMatrix}
  />
);

export default DecisionMatrixConfigurator;
