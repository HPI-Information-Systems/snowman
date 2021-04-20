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
import { ImmediateStore } from 'store/models';
import { couldPreviewExperiment } from 'utils/experimentsHelpers';

const mapStateToProps = (
  state: ImmediateStore,
  ownProps: ExperimentCardOwnProps
): ExperimentCardStateProps => ({
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
