import { IonList } from '@ionic/react';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroup';
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
  </IonList>
);

export default BinaryMetricsConfiguratorView;
