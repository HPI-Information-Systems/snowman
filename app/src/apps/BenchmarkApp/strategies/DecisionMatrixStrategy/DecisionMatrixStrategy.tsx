import GenericBenchmarkStrategy from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy';
import DecisionMatrixStrategyContainer from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategy.Container';
import { loadStrategyData } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/store/DecisionMatrixStrategyActions';
import { DecisionMatrixStrategyStoreMagistrate } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/store/DecisionMatrixStrategyStoreFactory';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const DecisionMatrixStrategy = (): JSX.Element => (
  <GenericBenchmarkStrategy
    strategyId={StrategyIDs.KpiDecisionMatrix}
    createStrategyStore={DecisionMatrixStrategyStoreMagistrate.getStore}
    loadStrategyData={loadStrategyData}
  >
    <DecisionMatrixStrategyContainer />
  </GenericBenchmarkStrategy>
);

export default DecisionMatrixStrategy;
