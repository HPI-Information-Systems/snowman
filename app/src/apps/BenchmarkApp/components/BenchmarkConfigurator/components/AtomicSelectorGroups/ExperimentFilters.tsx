import { IonList } from '@ionic/react';
import AlgorithmSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AlgorithmSelectorGroup';
import { FilterComponentProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import DatasetSelectorGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/DatasetSelectorGroup';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { ExperimentFilterModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import React from 'react';

const ExperimentFilters = ({
  filter,
}: FilterComponentProps<ExperimentFilterModel>): JSX.Element => (
  <IonList>
    {filter?.forceDatasetFilter === undefined ? (
      <ConfiguratorItem title="Filter by Dataset">
        <DatasetSelectorGroup
          cacheKey={StoreCacheKey.filter}
          allowMultiple={filter?.allowMultipleDatasetFilter ?? true}
        />
      </ConfiguratorItem>
    ) : null}
    {filter?.forceAlgorithmFilter === undefined ? (
      <ConfiguratorItem title="Filter by Matching Solution">
        <AlgorithmSelectorGroup
          cacheKey={StoreCacheKey.filter}
          allowMultiple={filter?.allowMultipleAlgorithmFilter ?? true}
        />
      </ConfiguratorItem>
    ) : null}
  </IonList>
);

export default ExperimentFilters;
