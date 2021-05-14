import GenericBenchmarkStrategy from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy';
import DecisionMatrixStrategyContainer from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategy.Container';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';
import { dummyStoreFactory } from 'utils/storeFactory';

const DecisionMatrixStrategy = (): JSX.Element => (
  <GenericBenchmarkStrategy
    strategyId={StrategyIDs.KpiDecisionMatrix}
    createStrategyStore={dummyStoreFactory()}
  >
    <DecisionMatrixStrategyContainer />
  </GenericBenchmarkStrategy>
);

export default DecisionMatrixStrategy;
