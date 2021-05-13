import GenericBenchmarkStrategy from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy';
import SimilarityDiagramStrategyContainer from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/SimilarityDiagramStrategy.Container';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';
import { dummyStoreFactory } from 'utils/storeFactory';

const SimilarityDiagramStrategy = (): JSX.Element => (
  <GenericBenchmarkStrategy
    strategyId={StrategyIDs.SimilarityDiagram}
    createStrategyStore={dummyStoreFactory()}
  >
    <SimilarityDiagramStrategyContainer />
  </GenericBenchmarkStrategy>
);

export default SimilarityDiagramStrategy;
