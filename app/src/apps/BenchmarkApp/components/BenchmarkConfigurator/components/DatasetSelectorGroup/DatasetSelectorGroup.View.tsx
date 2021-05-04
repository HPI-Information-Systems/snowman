import { DatasetSelectorItemProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroupProps';
import { fileTrayFull } from 'ionicons/icons';
import React from 'react';

const DatasetSelectorItemView = ({
  dataset,
  cacheKey,
  setDatasetId,
}: DatasetSelectorItemProps): JSX.Element => (
  <SelectorPopoverGroup
    items={[{ icon: fileTrayFull, title: dataset?.name ?? '' }]}
  >
    popover stuff...
  </SelectorPopoverGroup>
);

export default DatasetSelectorItemView;
