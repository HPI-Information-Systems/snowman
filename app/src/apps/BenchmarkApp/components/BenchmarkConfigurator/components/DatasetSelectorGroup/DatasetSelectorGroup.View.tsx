import { DatasetSelectorItemProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroupProps';
import SelectorPopoverGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup';
import { fileTrayFull } from 'ionicons/icons';
import React from 'react';

const DatasetSelectorItemView = ({
  selectedDataset,
  datasets,
  cacheKey,
  setDatasetId,
}: DatasetSelectorItemProps): JSX.Element => (
  <SelectorPopoverGroup
    instanceDescriptor={cacheKey}
    items={[{ icon: fileTrayFull, title: selectedDataset?.name ?? '' }]}
  >
    <div>Hi</div>
  </SelectorPopoverGroup>
);

export default DatasetSelectorItemView;
