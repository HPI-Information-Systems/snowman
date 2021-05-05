import { Experiment } from 'api';
import AtomicSelectorGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup.View';
import {
  AtomicSelectorGroupDispatchProps,
  AtomicSelectorGroupOwnProps,
  AtomicSelectorGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import { updateExperimentSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreExperimentActions';
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
  const selectedIds = new Set(
    ownProps.allowMultiple
      ? getItems(ownProps.cacheKey, state.config.experiments)
      : [getSingleItem(ownProps.cacheKey, state.config.experiments)]
  );
  return {
    selectedEntities: state.resources.experiments.filter(
      (anExperiment: Experiment): boolean => selectedIds.has(anExperiment.id)
    ),
    entities: state.resources.experiments,
    icon: flask,
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
        filter: ownProps.filter ?? {},
      })
    ),
});

const ExperimentSelectorGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AtomicSelectorGroupView);

export default ExperimentSelectorGroup;
