import ExperimentCardView from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCard.View';
import {
  ExperimentCardDispatchProps,
  ExperimentCardOwnProps,
  ExperimentCardStateProps,
} from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCardProps';
import { doDeleteExperiment } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { connect } from 'react-redux';
import { openChangeDialog } from 'store/actions/ExperimentDialogStoreActions';
import { openPreviewer } from 'store/actions/ExperimentPreviewerActions';
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
    doDeleteExperiment(ownProps.experiment.id).then();
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
