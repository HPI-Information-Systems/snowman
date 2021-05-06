import { SimilarityThresholdFunction } from 'api';
import AtomicSelectorGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup.View';
import {
  AtomicSelectorGroupDispatchProps,
  AtomicSelectorGroupOwnProps,
  AtomicSelectorGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import { updateSimFunctionSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreSimFunctionActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { SimFunctionFilterModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import {
  ConfigurationFilters,
  StoreCacheKey,
} from 'apps/BenchmarkApp/types/StoreCacheKey';
import {
  getItems,
  getSingleItem,
} from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { filterEntities } from 'apps/BenchmarkApp/utils/filterItems';
import { analytics } from 'ionicons/icons';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupStateProps<SimFunctionFilterModel> => {
  const filter = ConfigurationFilters[StoreCacheKey.simFunction];
  const availableSimFunctions = filterEntities({
    aFilterCacheKey: filter?.forceExperimentFilter,
    fallbackCacheKey: StoreCacheKey.filter,
    cache: state.config.simFunctions,
    entities: state.resources.simFunctions,
    isAllowed: ({ experimentId }, filter) => filter.has(experimentId),
    allowMultipleFilters: filter?.allowMultipleExperimentFilter,
  });
  const selectedIds = new Set(
    ownProps.allowMultiple
      ? getItems(ownProps.cacheKey, state.config.simFunctions)
      : [getSingleItem(ownProps.cacheKey, state.config.simFunctions)]
  );
  return {
    selectedEntities: availableSimFunctions.filter(
      (aSimFunction: SimilarityThresholdFunction): boolean =>
        selectedIds.has(aSimFunction.id)
    ),
    entities: availableSimFunctions,
    icon: analytics,
    filter,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupDispatchProps => ({
  updateSelection: (simFuncIds) =>
    dispatch(
      updateSimFunctionSelection({
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
