import ExperimentCardView from 'components/ExperimentCard/ExperimentCard.View';
import {
  ExperimentCardDispatchProps,
  ExperimentCardOwnProps,
  ExperimentCardStateProps,
} from 'components/ExperimentCard/ExperimentCardProps';
import { connect } from 'react-redux';
import { openChangeDialog } from 'store/actions/ExperimentDialogStoreActions';
import { openPreviewer } from 'store/actions/ExperimentPreviewerActions';
import { deleteExperiment } from 'store/actions/ExperimentsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { getAlgorithmNameFromId } from 'utils/algorithmHelpers';
import { couldPreviewExperiment } from 'utils/experimentsHelpers';

const mapStateToProps = (
  state: Store,
  ownProps: ExperimentCardOwnProps
): ExperimentCardStateProps => ({
  algorithmName: getAlgorithmNameFromId(
    ownProps.experiment.algorithmId,
    state.CoreStore.algorithms
  ),
  couldPreview: couldPreviewExperiment(ownProps.experiment),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: ExperimentCardOwnProps
): ExperimentCardDispatchProps => ({
  editExperiment() {
    dispatch(openChangeDialog(ownProps.experiment)).then();
  },
  deleteExperiment() {
    dispatch(deleteExperiment(ownProps.experiment)).then();
  },
  previewExperiment() {
    dispatch(openPreviewer(ownProps.experiment));
  },
});

const ExperimentCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentCardView);

export default ExperimentCard;
