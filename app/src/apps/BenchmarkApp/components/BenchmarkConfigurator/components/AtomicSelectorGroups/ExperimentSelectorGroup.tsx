import { Experiment } from 'api';
import { getCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import AtomicSelectorGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup.View';
import {
  AtomicSelectorGroupDispatchProps,
  AtomicSelectorGroupOwnProps,
  AtomicSelectorGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStoreActions';
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
  let availableExperiments = state.resources.experiments;
  const filterEntities = getCacheKeyAndFilter(ownProps.cacheKey).filter
    ?.filterAvailableEntities;
  if (filterEntities) {
    availableExperiments = filterEntities(
      state,
      availableExperiments
    ) as Experiment[];
  }
  const selectedIds = new Set(
    ownProps.allowMultiple
      ? getItems(ownProps.cacheKey, state)
      : [getSingleItem(ownProps.cacheKey, state)]
  );
  return {
    selectedEntities: availableExperiments.filter(
      (anExperiment: Experiment): boolean => selectedIds.has(anExperiment.id)
    ),
    entities: availableExperiments,
    icon: flask,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupDispatchProps => ({
  updateSelection: (experimendIds) =>
    dispatch(
      updateSelection('experiments', {
        aCacheKey: ownProps.cacheKey,
        newSelection: experimendIds,
        allowMultiple: ownProps.allowMultiple,
      })
    ),
});

const ExperimentSelectorGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AtomicSelectorGroupView);

export default ExperimentSelectorGroup;
