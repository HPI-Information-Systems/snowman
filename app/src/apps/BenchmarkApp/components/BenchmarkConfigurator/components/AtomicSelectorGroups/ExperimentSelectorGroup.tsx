import { Experiment } from 'api';
import AtomicSelectorGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup.View';
import {
  AtomicSelectorGroupDispatchProps,
  AtomicSelectorGroupOwnProps,
  AtomicSelectorGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import ExperimentFilters from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/ExperimentFilters';
import { updateExperimentSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreExperimentActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ExperimentFilterModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import {
  ConfigurationFilters,
  StoreCacheKey,
} from 'apps/BenchmarkApp/types/StoreCacheKey';
import {
  getItems,
  getSingleItem,
} from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { filterEntities } from 'apps/BenchmarkApp/utils/filterItems';
import { flask } from 'ionicons/icons';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupStateProps<ExperimentFilterModel> => {
  const filter = ConfigurationFilters[StoreCacheKey.experiment];
  let availableExperiments = filterEntities({
    aFilterCacheKey: filter?.forceDatasetFilter,
    fallbackCacheKey: StoreCacheKey.filter,
    cache: state.config.datasets,
    entities: state.resources.experiments,
    isAllowed: ({ datasetId }, filter) => filter.has(datasetId),
    allowMultipleFilters: filter?.allowMultipleDatasetFilter,
  });
  availableExperiments = filterEntities({
    aFilterCacheKey: filter?.forceAlgorithmFilter,
    fallbackCacheKey: StoreCacheKey.filter,
    cache: state.config.algorithms,
    entities: availableExperiments,
    isAllowed: ({ algorithmId }, filter) => filter.has(algorithmId),
    allowMultipleFilters: filter?.allowMultipleAlgorithmFilter,
  });
  const selectedIds = new Set(
    ownProps.allowMultiple
      ? getItems(ownProps.cacheKey, state.config.experiments)
      : [getSingleItem(ownProps.cacheKey, state.config.experiments)]
  );
  return {
    selectedEntities: availableExperiments.filter(
      (anExperiment: Experiment): boolean => selectedIds.has(anExperiment.id)
    ),
    entities: availableExperiments,
    icon: flask,
    filterComponent: ExperimentFilters,
    filter,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupDispatchProps => ({
  updateSelection: (algorithmIds) =>
    dispatch(
      updateExperimentSelection({
        aCacheKey: ownProps.cacheKey,
        newSelection: algorithmIds,
        allowMultiple: ownProps.allowMultiple,
      })
    ),
});

const ExperimentSelectorGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AtomicSelectorGroupView) as (
  props: AtomicSelectorGroupOwnProps
) => JSX.Element;

export default ExperimentSelectorGroup;
