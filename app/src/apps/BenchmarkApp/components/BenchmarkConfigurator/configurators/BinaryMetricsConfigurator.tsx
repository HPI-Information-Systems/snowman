import { IonList } from '@ionic/react';
import { getCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup';
import ExperimentSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import GenericConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/GenericConfigurator/GenericConfigurator';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';

const BinaryMetricsConfigurator = (): JSX.Element => (
  <GenericConfigurator strategyID={StrategyIDs.BinaryMetrics}>
    <IonList>
      <ConfiguratorItem title="1. Select Dataset">
        <DatasetSelectorGroup
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.dataset)}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="2. Select Ground Truth">
        <ExperimentSelectorGroup
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.groundTruth)}
          allowMultiple={false}
        />
      </ConfiguratorItem>
      <ConfiguratorItem title="3. Select Experiment">
        <ExperimentSelectorGroup
          cacheKey={getCacheKey(StoreCacheKeyBaseEnum.experiment)}
          allowMultiple={false}
        />
      </ConfiguratorItem>
    </IonList>
  </GenericConfigurator>
);

export default BinaryMetricsConfigurator;
