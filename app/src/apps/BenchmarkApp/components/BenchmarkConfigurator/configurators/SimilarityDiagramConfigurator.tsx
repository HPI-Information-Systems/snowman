import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { buildConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/builder';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

export const SimilarityDiagramConfiguration = buildConfigurator({
  diagramTracks: {
    position: 0,
    heading: '1. Select Diagram Tracks',
    configuration: [
      {
        dataset: {
          configuration: StoreCacheKeyBaseEnum.dataset,
          position: 1,
          heading: 'Select Dataset',
        },
        groundTruth: {
          configuration: StoreCacheKeyBaseEnum.groundTruth,
          position: 2,
          heading: 'Select Ground Truth',
        },
        experiments: {
          configuration: [
            {
              experiment: {
                configuration: StoreCacheKeyBaseEnum.experiment,
                position: 1,
                heading: 'Select Experiment',
              },
              simFunction: {
                configuration: StoreCacheKeyBaseEnum.similarityFunction,
                position: 2,
                heading: 'Select Similarity Score',
              },
            },
            StoreCacheKeyBaseEnum.experiment,
          ],
          position: 3,
          heading: 'Select Similarity Scores',
        },
      },
      StoreCacheKeyBaseEnum.dataset,
    ],
  },
});

const SimilarityDiagramConfigurator = (): JSX.Element => (
  <GenericConfigurator
    cacheKey={SimilarityDiagramConfiguration.cacheKey}
    strategyID={StrategyIDs.SimilarityDiagram} // TODO
  />
);

export default SimilarityDiagramConfigurator;
