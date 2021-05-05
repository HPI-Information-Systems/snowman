import { IonList } from '@ionic/react';
import AlgorithmSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AlgorithmSelectorGroup';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup';
import ExperimentSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import { CacheBaseKeyEnum } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import React from 'react';

const BinaryMetricsConfiguratorView = (): JSX.Element => (
  <IonList>
    <ConfiguratorItem title="1. Select Dataset">
      <DatasetSelectorGroup
        cacheKey={CacheBaseKeyEnum.dataset}
        allowMultiple={false}
      />
    </ConfiguratorItem>
    <ConfiguratorItem title="2. Select Datasets">
      <DatasetSelectorGroup
        cacheKey={CacheBaseKeyEnum.dataset}
        allowMultiple={true}
      />
    </ConfiguratorItem>
    <ConfiguratorItem title="3. Select Algorithms">
      <AlgorithmSelectorGroup
        cacheKey={CacheBaseKeyEnum.algorithm}
        allowMultiple={true}
      />
    </ConfiguratorItem>
    <ConfiguratorItem title="4. Select Experiments">
      <ExperimentSelectorGroup
        cacheKey={CacheBaseKeyEnum.experiment}
        allowMultiple={true}
      />
    </ConfiguratorItem>
  </IonList>
);

export default BinaryMetricsConfiguratorView;
