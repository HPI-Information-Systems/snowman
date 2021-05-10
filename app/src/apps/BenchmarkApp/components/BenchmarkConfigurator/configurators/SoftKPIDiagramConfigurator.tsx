import { IonList } from '@ionic/react';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { buildConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/builder';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

export const SoftKPIDiagramConfiguration = buildConfigurator([
  {
    dataset: {
      configuration: StoreCacheKeyBaseEnum.dataset,
      position: 1,
      heading: 'Select Dataset',
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
            heading: '(Optional) Select Similarity Function and Threshold',
          },
          threshold: {
            configuration: StoreCacheKeyBaseEnum.similarityThreshold,
            position: 3,
          },
        },
      ],
      position: 2,
      heading: 'Select Experiments',
    },
  },
]);

export const SoftKPIDiagramConfigurator = (): JSX.Element => (
  <GenericConfigurator strategyID={StrategyIDs.KpiInvestigator}>
    <IonList>
      <ConfiguratorItem
        title="1. Select Diagram Tracks"
        configurators={[[SoftKPIDiagramConfiguration.cacheKey, false]]}
      />
    </IonList>
  </GenericConfigurator>
);
