import { Experiment } from 'api';
import ExperimentDroppableView from 'components/ExperimentDroppable/ExperimentDroppable.View';
import {
  ExperimentDroppableDispatchProps,
  ExperimentDroppableOwnProps,
  ExperimentDroppableStateProps,
} from 'components/ExperimentDroppable/ExperimentDroppableProps';
import { connect } from 'react-redux';
import { deleteExperiment } from 'store/actions/CoreStoreActions';
import { openChangeDialog } from 'store/actions/ExperimentDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { getExperimentBucketFromId } from 'store/reducers/BenchmarkConfiguratorReducer';

const mapStateToProps = (
  state: Store,
  ownProps: ExperimentDroppableOwnProps
): ExperimentDroppableStateProps => ({
  matchingSolutions: state.CoreStore.algorithms,
  bucketContent: getExperimentBucketFromId(
    state.BenchmarkConfigurationStore,
    ownProps.bucketId
  ),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): ExperimentDroppableDispatchProps => ({
  editExperiment(anExperiment: Experiment) {
    dispatch(openChangeDialog(anExperiment)).then();
  },
  deleteExperiment(anExperiment: Experiment) {
    dispatch(deleteExperiment(anExperiment)).then();
  },
});

const ExperimentDroppable = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentDroppableView);

export default ExperimentDroppable;
