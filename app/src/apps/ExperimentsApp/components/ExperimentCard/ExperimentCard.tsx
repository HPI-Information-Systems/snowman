import ExperimentCardView from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCard.View';
import {
  ExperimentCardDispatchProps,
  ExperimentCardOwnProps,
  ExperimentCardStateProps,
} from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCardProps';
import { PreviewDialogTypes } from 'apps/PreviewDialog/types/PreviewDialogTypes';
import { doDeleteExperiment } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import { ImmediateStore } from 'store/models';
import { ViewIDs } from 'types/ViewIDs';
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
    doOpenDialog(ViewIDs.ExperimentDialog, ownProps.experiment.id);
  },
  deleteExperiment() {
    doDeleteExperiment(ownProps.experiment.id).then();
  },
  previewExperiment() {
    doOpenDialog(
      ViewIDs.PreviewDialog,
      ownProps.experiment.id,
      PreviewDialogTypes.EXPERIMENT
    );
  },
});

const ExperimentCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentCardView);

export default ExperimentCard;
