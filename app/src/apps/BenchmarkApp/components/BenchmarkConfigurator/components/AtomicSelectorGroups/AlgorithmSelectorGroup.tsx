import { Algorithm } from 'api';
import { getCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import AtomicSelectorGroupFilters from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupFilters';
import {
  AtomicSelectorGroupDispatchProps,
  AtomicSelectorGroupOwnProps,
  AtomicSelectorGroupProps,
  AtomicSelectorGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import SearchableList from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/SearchableList';
import SelectorPopoverGroup from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/SelectorPopoverGroup';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  getItems,
  getSingleItem,
} from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { useInstanceDescriptor } from 'apps/BenchmarkApp/utils/useInstanceDescriptor';
import { hardwareChip } from 'ionicons/icons';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupStateProps => {
  const selectedIds = new Set(
    ownProps.allowMultiple
      ? getItems(ownProps.cacheKey, state.config.algorithms)
      : [getSingleItem(ownProps.cacheKey, state.config.algorithms)]
  );
  return {
    selectedEntities: state.resources.algorithms.filter(
      (anAlgorithm: Algorithm): boolean => selectedIds.has(anAlgorithm.id)
    ),
    entities: state.resources.algorithms,
    icon: hardwareChip,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupDispatchProps => ({
  updateSelection: (algorithmIds) =>
    dispatch(
      updateSelection('algorithms', {
        aCacheKey: ownProps.cacheKey,
        newSelection: algorithmIds,
        allowMultiple: ownProps.allowMultiple,
      })
    ),
});

const AlgorithmSelectorGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  ({
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
  }
);

export default AlgorithmSelectorGroup;
