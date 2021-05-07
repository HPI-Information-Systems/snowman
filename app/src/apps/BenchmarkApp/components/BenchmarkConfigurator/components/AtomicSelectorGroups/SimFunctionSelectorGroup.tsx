import { SimilarityThresholdFunction } from 'api';
import { getCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import {
  AtomicSelectorGroupDispatchProps,
  AtomicSelectorGroupOwnProps,
  AtomicSelectorGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import AtomicSelectorGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupView';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  getItems,
  getSingleItem,
} from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { analytics } from 'ionicons/icons';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupStateProps => {
  let availableFunctions = state.resources.simFunctions;
  const filterEntities = getCacheKeyAndFilter(ownProps.cacheKey).filter
    ?.filterAvailableEntities;
  if (filterEntities) {
    availableFunctions = filterEntities(
      state,
      availableFunctions
    ) as SimilarityThresholdFunction[];
  }
  const selectedIds = new Set(
    ownProps.allowMultiple
      ? getItems(ownProps.cacheKey, state.config.simFunctions)
      : [getSingleItem(ownProps.cacheKey, state.config.simFunctions)]
  );
  return {
    selectedEntities: availableFunctions.filter(
      (aFunction: SimilarityThresholdFunction): boolean =>
        selectedIds.has(aFunction.id)
    ),
    entities: availableFunctions,
    icon: analytics,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupDispatchProps => ({
  updateSelection: (simFuncIds) =>
    dispatch(
      updateSelection('simFunctions', {
        aCacheKey: ownProps.cacheKey,
        newSelection: simFuncIds,
        allowMultiple: ownProps.allowMultiple,
      })
    ),
});

const SimFunctionsSelectorGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AtomicSelectorGroupView) as (
  props: AtomicSelectorGroupOwnProps
) => JSX.Element;

export default SimFunctionsSelectorGroup;
