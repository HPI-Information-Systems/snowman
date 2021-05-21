import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { buildConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/builder';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

export const KPIDiagramConfiguration = buildConfigurator({
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
          configuration: {
            experiment: {
              configuration: StoreCacheKeyBaseEnum.groundTruth,
              position: 1,
              heading: 'Select Ground Truth Experiment',
            },
            simFunction: {
              configuration: StoreCacheKeyBaseEnum.similarityFunction,
              position: 2,
              heading: '(Optional) Select Similarity Score and Threshold',
            },
            threshold: {
              configuration: StoreCacheKeyBaseEnum.similarityThreshold,
              position: 3,
            },
          },
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
                heading: '(Optional) Select Similarity Score and Threshold',
              },
              threshold: {
                configuration: StoreCacheKeyBaseEnum.similarityThreshold,
                position: 3,
              },
            },
            StoreCacheKeyBaseEnum.experiment,
          ],
          position: 3,
          heading: 'Select Experiments',
        },
      },
      StoreCacheKeyBaseEnum.dataset,
    ],
  },
});

export const KPIDiagramConfigurator = (): JSX.Element => (
  <GenericConfigurator
    cacheKey={KPIDiagramConfiguration.cacheKey}
    strategyID={StrategyIDs.KpiInvestigator}
  />
);
