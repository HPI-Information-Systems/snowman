import { IonList } from '@ionic/react';
import AlgorithmSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AlgorithmSelectorGroup';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup';
import ExperimentSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import { StoreCacheKeysEnum } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import React from 'react';

const BinaryMetricsConfiguratorView = (): JSX.Element => (
  <IonList>
    <ConfiguratorItem title="1. Select Dataset">
      <DatasetSelectorGroup
        cacheKey={StoreCacheKeysEnum.dataset}
        allowMultiple={false}
      />
    </ConfiguratorItem>
    <ConfiguratorItem title="2. Select Datasets">
      <DatasetSelectorGroup
        cacheKey={StoreCacheKeysEnum.dataset}
        allowMultiple={true}
      />
    </ConfiguratorItem>
    <ConfiguratorItem title="3. Select Algorithms">
      <AlgorithmSelectorGroup
        cacheKey={StoreCacheKeysEnum.algorithm}
        allowMultiple={true}
      />
    </ConfiguratorItem>
    <ConfiguratorItem title="4. Select Experiments">
      <ExperimentSelectorGroup
        cacheKey={StoreCacheKeysEnum.experiment}
        allowMultiple={true}
      />
    </ConfiguratorItem>
    <ConfiguratorItem title="4. Select Experiments">
      <ExperimentSelectorGroup
        cacheKey={StoreCacheKeysEnum.experiment}
        allowMultiple={true}
        filter={{
          forceDatasetFilter: StoreCacheKeysEnum.dataset,
        }}
      />
    </ConfiguratorItem>
  </IonList>
);

export default BinaryMetricsConfiguratorView;
