import GenericBenchmarkStrategy from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy';
import SimilarityDiagramStrategyContainer from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/SimilarityDiagramStrategy.Container';
import { SimilarityDiagramStrategyStoreMagistrate } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/store/SimilarityDiagramStrategyStoreMagistrate';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const SimilarityDiagramStrategy = (): JSX.Element => (
  <GenericBenchmarkStrategy
    strategyId={StrategyIDs.SimilarityDiagram}
    createStrategyStore={SimilarityDiagramStrategyStoreMagistrate.getStore}
  >
    <SimilarityDiagramStrategyContainer />
  </GenericBenchmarkStrategy>
);

export default SimilarityDiagramStrategy;
