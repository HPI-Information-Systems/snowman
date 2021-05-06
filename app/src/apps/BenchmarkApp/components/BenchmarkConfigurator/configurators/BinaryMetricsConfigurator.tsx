import { IonList } from '@ionic/react';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup';
import ExperimentSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const BinaryMetricsConfigurator = (): JSX.Element => (
  <GenericConfigurator strategyID={StrategyIDs.BinaryMetrics}>
    <IonList>
      <ConfiguratorItem title="1. Select Dataset">
        <DatasetSelectorGroup
          cacheKey={StoreCacheKey.dataset}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="2. Select Ground Truth">
        <ExperimentSelectorGroup
          cacheKey={StoreCacheKey.groundTruth}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="3. Select Experiment">
        <ExperimentSelectorGroup
          cacheKey={StoreCacheKey.experiment}
          allowMultiple={false}
        />
      </ConfiguratorItem>
    </IonList>
  </GenericConfigurator>
);

export default BinaryMetricsConfigurator;
