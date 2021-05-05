import { IonList } from '@ionic/react';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup';
import ExperimentSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import React from 'react';

const BinaryMetricsConfiguratorView = (): JSX.Element => (
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
    <ConfiguratorItem title="3. Select Experiments">
      <ExperimentSelectorGroup
        cacheKey={StoreCacheKey.experiment}
        allowMultiple={false}
      />
    </ConfiguratorItem>
  </IonList>
);

export default BinaryMetricsConfiguratorView;
