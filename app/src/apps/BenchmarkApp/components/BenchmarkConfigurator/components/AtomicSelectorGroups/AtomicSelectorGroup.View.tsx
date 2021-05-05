import { AtomicSelectorGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import SearchableList from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/SearchableList';
import SelectorPopoverGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup';
import { useInstanceDescriptor } from 'apps/BenchmarkApp/utils/useInstanceDescriptor';
import React from 'react';

const AtomicSelectorGroupView = ({
  entities,
  selectedEntities,
  updateSelection,
  allowMultiple,
  icon,
}: AtomicSelectorGroupProps): JSX.Element => (
  <SelectorPopoverGroup
    instanceDescriptor={useInstanceDescriptor()}
    items={selectedEntities.map((entity) => ({
      icon,
      title: entity.name ?? '',
    }))}
  >
    <SearchableList
      entities={entities}
      icon={icon}
      selectedEntities={selectedEntities.map(({ id }) => id)}
      updateSelection={updateSelection}
      allowMultiple={allowMultiple}
    />
  </SelectorPopoverGroup>
);
export default AtomicSelectorGroupView;
