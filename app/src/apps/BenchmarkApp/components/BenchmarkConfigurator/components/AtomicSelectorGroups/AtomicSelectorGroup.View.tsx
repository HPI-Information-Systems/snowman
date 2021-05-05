import { AtomicSelectorGroupProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import SearchableList from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/SearchableList';
import SelectorPopoverGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { useInstanceDescriptor } from 'apps/BenchmarkApp/utils/useInstanceDescriptor';
import React from 'react';
import { Provider } from 'react-redux';

const AtomicSelectorGroupView = ({
  entities,
  selectedEntities,
  updateSelection,
  allowMultiple,
  icon,
  filter,
  filterComponent,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
AtomicSelectorGroupProps<any>): JSX.Element => (
  <SelectorPopoverGroup
    instanceDescriptor={useInstanceDescriptor()}
    items={selectedEntities.map((entity) => ({
      icon,
      title: entity.name ?? '',
    }))}
  >
    <SearchableList
      instanceDescriptor={useInstanceDescriptor()}
      entities={entities}
      icon={icon}
      selectedEntities={selectedEntities.map(({ id }) => id)}
      updateSelection={updateSelection}
      allowMultiple={allowMultiple}
    >
      {filterComponent !== undefined ? (
        <Provider store={BenchmarkAppStoreMagistrate.getStore()}>
          {React.createElement(filterComponent, { filter })}
        </Provider>
      ) : (
        <></>
      )}
    </SearchableList>
  </SelectorPopoverGroup>
);
export default AtomicSelectorGroupView;
