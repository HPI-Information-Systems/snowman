import { DatasetSelectorItemProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroupProps';
import SearchableList from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/SearchableList';
import SelectorPopoverGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup';
import { fileTrayFull } from 'ionicons/icons';
import React from 'react';

const DatasetSelectorGroupView = ({
  datasets,
  getCacheKey,
  selectedDatasets,
  updateSelection,
  allowMultiple,
}: DatasetSelectorItemProps): JSX.Element => (
  <SelectorPopoverGroup
    instanceDescriptor={getCacheKey()}
    items={selectedDatasets.map((dataset) => ({
      icon: fileTrayFull,
      title: dataset.name ?? '',
    }))}
  >
    <SearchableList
      entities={datasets}
      icon={fileTrayFull}
      selectedEntities={selectedDatasets.map(({ id }) => id)}
      updateSelection={updateSelection}
      allowMultiple={allowMultiple}
    />
  </SelectorPopoverGroup>
);

export default DatasetSelectorGroupView;
