import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { buildConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/builder';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

export const SimilarityDiagramConfiguration = buildConfigurator({
  algorithms: {
    configuration: [
      {
        algorithm: {
          configuration: StoreCacheKeyBaseEnum.algorithm,
          position: 1,
          heading: 'Select Algorithm',
        },
      },
      StoreCacheKeyBaseEnum.algorithm,
    ],
    position: 1,
    heading: '1. Select Diagram Tracks',
  },
});

const SimilarityDiagramConfigurator = (): JSX.Element => (
  <GenericConfigurator
    cacheKey={SimilarityDiagramConfiguration.cacheKey}
    strategyID={StrategyIDs.SimilarityFunctionInvestigator}
  />
);

export default SimilarityDiagramConfigurator;
