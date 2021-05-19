import { IonList } from '@ionic/react';
import { getCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { serializeCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/serializeCacheKey';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { EntityInputProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/EntityInput/EntityInput.props';
import ConfiguratorItem from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/ConfiguratorItem/ConfiguratorItem';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import EntitySelectableInputFactory from 'components/stateful/SelectableInputFactory/EntitySelectableInputFactory';
import React, { useMemo } from 'react';
import { Provider } from 'react-redux';

const EntityInputView = ({
  entities,
  selectedEntities,
  updateSelection,
  allowMultiple,
  cacheKey,
  itemType,
}: EntityInputProps): JSX.Element => {
  const viewFilters = (getCacheKeyAndFilter(cacheKey).filter?.viewFilters() ??
    []) as StoreCacheKey[];
  const SelectableInput = useMemo(
    () => EntitySelectableInputFactory(itemType),
    [itemType]
  );
  return (
    <SelectableInput
      selection={selectedEntities.map(({ id }) => id)}
      allOptions={entities}
      allowMultiselect={allowMultiple ?? true}
      onChange={updateSelection}
      instanceDescriptor={serializeCacheKey(cacheKey)}
    >
      {viewFilters.length > 0 ? (
        <Provider store={BenchmarkAppStoreMagistrate.getStore()}>
          <IonList>
            <ConfiguratorItem
              title="Filter"
              configurators={viewFilters.map((key) => [key, true])}
            />
          </IonList>
        </Provider>
      ) : (
        <></>
      )}
    </SelectableInput>
  );
};
export default EntityInputView;
