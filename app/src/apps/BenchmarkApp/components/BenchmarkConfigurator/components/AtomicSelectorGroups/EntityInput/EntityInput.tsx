import { getCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { SearchableEntity } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/types';
import {
  EntityInputDispatchProps,
  EntityInputOwnProps,
  EntityInputStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/EntityInput/EntityInput.props';
import EntityInputView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/EntityInput/EntityInput.View';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  getItems,
  getSingleItem,
} from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { EntityItemType } from 'components/simple/EntityItem/EntityItemType';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: EntityInputOwnProps
): EntityInputStateProps<EntityItemType> => {
  const cacheKeyAndFilter = getCacheKeyAndFilter(ownProps.cacheKey);
  const filterEntities = cacheKeyAndFilter.filter?.filterAvailableEntities as (
    state: BenchmarkAppModel,
    availableEntities: Record<number, SearchableEntity>
  ) => SearchableEntity[];
  let availableEntities = cacheKeyAndFilter.getEntities(state);
  if (filterEntities) {
    availableEntities = filterEntities(state, availableEntities);
  }
  const selectedIds = new Set(
    ownProps.allowMultiple
      ? getItems(ownProps.cacheKey, state)
      : [getSingleItem(ownProps.cacheKey, state)]
  );
  return {
    selectedEntities: Object.values(
      availableEntities
    ).filter((anEntity): boolean => selectedIds.has(anEntity.id)),
    entities: Object.values(availableEntities),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    itemType: cacheKeyAndFilter.itemType!(),
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: EntityInputOwnProps
): EntityInputDispatchProps => ({
  updateSelection: (newSelection) =>
    dispatch(
      updateSelection({
        aCacheKey: ownProps.cacheKey,
        newSelection,
        allowMultiple: ownProps.allowMultiple,
      })
    ),
});

const EntityInputGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntityInputView);

export default EntityInputGroup;
