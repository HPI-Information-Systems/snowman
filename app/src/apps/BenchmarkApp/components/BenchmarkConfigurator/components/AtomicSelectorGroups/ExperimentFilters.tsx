import { IonList } from '@ionic/react';
import AlgorithmSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AlgorithmSelectorGroup';
import { FilterComponentProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import {
  fallbackFilterChacheKey,
  StoreCacheKeysEnum,
} from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ExperimentFilterModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import React from 'react';

const ExperimentFilters = ({
  filter,
}: FilterComponentProps<ExperimentFilterModel>): JSX.Element => (
  <IonList>
    <ConfiguratorItem title="Filter by Dataset">
      <DatasetSelectorGroup
        cacheKey={
          filter?.forceDatasetFilter ??
          fallbackFilterChacheKey(StoreCacheKeysEnum.dataset)
        }
        allowMultiple={true}
      />
    </ConfiguratorItem>
    <ConfiguratorItem title="Filter by Matching Solution">
      <AlgorithmSelectorGroup
        cacheKey={
          filter?.forceAlgorithmFilter ??
          fallbackFilterChacheKey(StoreCacheKeysEnum.algorithm)
        }
        allowMultiple={true}
      />
    </ConfiguratorItem>
  </IonList>
);

export default ExperimentFilters;
