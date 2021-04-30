import GenericBenchmarkStrategy from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy';
import BinaryMetricsStrategyContainer from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/BinaryMetricsStrategy.Container';
import { loadStrategyData } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/store/BinaryMetricsStrategyActions';
import { BinaryMetricsStrategyStoreMagistrate } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/store/BinaryMetricsStrategyStoreFactory';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const BinaryMetricsStrategy = (): JSX.Element => (
  <GenericBenchmarkStrategy
    strategyId={StrategyIDs.BinaryMetrics}
    createStrategyStore={BinaryMetricsStrategyStoreMagistrate.getStore}
    loadStrategyData={loadStrategyData}
  >
    <BinaryMetricsStrategyContainer />
  </GenericBenchmarkStrategy>
);

export default BinaryMetricsStrategy;
