import GenericBenchmarkStrategy from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy';
import NMetricsStrategyContainer from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategy.Container';
import { NMetricsStrategyOwnProps } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategyProps';
import { createNMetricsStrategyStore } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/store/NMetricsStoreFactory';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const NMetricsStrategy = (props: NMetricsStrategyOwnProps): JSX.Element => (
  <GenericBenchmarkStrategy
    strategyId={StrategyIDs.NaryMetrics}
    createStrategyStore={createNMetricsStrategyStore}
  >
    <NMetricsStrategyContainer {...props} />
  </GenericBenchmarkStrategy>
);

export default NMetricsStrategy;
