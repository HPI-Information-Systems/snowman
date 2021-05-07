import GenericBenchmarkStrategy from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy';
import KpiInvestigatorStrategyContainer from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/KpiInvestigatorStrategy.Container';
import { KpiInvestigatorStrategyStoreMagistrate } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/store/KpiInvestigatorStrategyStoreFactory';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const KpiInvestigatorStrategy = (): JSX.Element => (
  <GenericBenchmarkStrategy
    strategyId={StrategyIDs.KpiInvestigator}
    createStrategyStore={KpiInvestigatorStrategyStoreMagistrate.getStore}
  >
    <KpiInvestigatorStrategyContainer />
  </GenericBenchmarkStrategy>
);

export default KpiInvestigatorStrategy;
