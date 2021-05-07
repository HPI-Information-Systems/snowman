import { getCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import AtomicSelectorGroupFilters from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupFilters';
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
  cacheKey,
}: AtomicSelectorGroupProps): JSX.Element => {
  const viewFilters =
    getCacheKeyAndFilter(cacheKey).filter?.viewFilters() ??
    ([] as StoreCacheKey[]);
  return (
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
        {viewFilters.length > 0 ? (
          <Provider store={BenchmarkAppStoreMagistrate.getStore()}>
            <AtomicSelectorGroupFilters viewFilters={viewFilters} />
          </Provider>
        ) : (
          <></>
        )}
      </SearchableList>
    </SelectorPopoverGroup>
  );
};
export default AtomicSelectorGroupView;
