import { getCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import {
  AtomicSelectorGroupDispatchProps,
  AtomicSelectorGroupOwnProps,
  AtomicSelectorGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import EntityInputView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/EntityInput/EntityInput.View';
import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SearchableList/types/SearchableEntity';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  getItems,
  getSingleItem,
} from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { flask } from 'ionicons/icons';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupStateProps => {
  const cacheKeyAndFilter = getCacheKeyAndFilter(ownProps.cacheKey);
  const filterEntities = cacheKeyAndFilter.filter?.filterAvailableEntities;
  let availableEntities = cacheKeyAndFilter.getEntities(
    state
  ) as SearchableEntity[];
  if (filterEntities) {
    availableEntities = filterEntities(state, availableEntities);
  }
  const selectedIds = new Set(
    ownProps.allowMultiple
      ? getItems(ownProps.cacheKey, state)
      : [getSingleItem(ownProps.cacheKey, state)]
  );
  return {
    selectedEntities: availableEntities.filter((anEntity): boolean =>
      selectedIds.has(anEntity.id)
    ),
    entities: availableEntities,
    icon: flask,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupDispatchProps => ({
  updateSelection: (experimendIds) =>
    dispatch(
      updateSelection({
        aCacheKey: ownProps.cacheKey,
        newSelection: experimendIds,
        allowMultiple: ownProps.allowMultiple,
      })
    ),
});

const EntityInputGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityInputView);

export default EntityInputGroup;
