import GenericBenchmarkStrategy from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy';
import IntersectionStrategyContainer from 'apps/BenchmarkApp/strategies/IntersectionStrategy/IntersectionStrategy.Container';
import { loadStrategyData } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/store/IntersectionStrategyActions';
import { IntersectionStrategyStoreMagistrate } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/store/IntersectionStrategyStoreFactory';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const IntersectionStrategy = (): JSX.Element => (
  <GenericBenchmarkStrategy
    strategyId={StrategyIDs.NaryIntersection}
    createStrategyStore={IntersectionStrategyStoreMagistrate.getStore}
    loadStrategyData={loadStrategyData}
  >
    <IntersectionStrategyContainer />
  </GenericBenchmarkStrategy>
);

export default IntersectionStrategy;
