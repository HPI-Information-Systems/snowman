import GenericBenchmarkStrategy from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy';
import NMetricsStrategyContainer from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategy.Container';
import { loadStrategyData } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/store/NMetricsStrategyActions';
import { NMetricsStrategyStoreMagistrate } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/store/NMetricsStrategyStoreFactory';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const NMetricsStrategy = (): JSX.Element => (
  <GenericBenchmarkStrategy
    strategyId={StrategyIDs.NaryMetrics}
    createStrategyStore={NMetricsStrategyStoreMagistrate.getStore}
    loadStrategyData={loadStrategyData}
  >
    <NMetricsStrategyContainer />
  </GenericBenchmarkStrategy>
);

export default NMetricsStrategy;
