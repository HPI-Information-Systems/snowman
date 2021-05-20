import ExperimentCardView from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCard.View';
import {
  ExperimentCardDispatchProps,
  ExperimentCardOwnProps,
  ExperimentCardStateProps,
} from 'apps/ExperimentsApp/components/ExperimentCard/ExperimentCardProps';
import { ExperimentsAppModel } from 'apps/ExperimentsApp/types/ExperimentsAppModel';
import { PreviewDialogTypes } from 'apps/PreviewDialog/types/PreviewDialogTypes';
import { doDeleteExperiment } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { ViewIDs } from 'types/ViewIDs';
import { couldPreviewExperiment } from 'utils/experimentsHelpers';

const mapStateToProps = (
  _: never,
  ownProps: ExperimentCardOwnProps
): ExperimentCardStateProps => ({
  couldPreview: couldPreviewExperiment(ownProps.experiment),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<ExperimentsAppModel>,
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
  editSimilarityFunctions() {
    doOpenDialog(ViewIDs.SimilarityFuncsDialog, ownProps.experiment.id);
  },
});

const ExperimentCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentCardView);

export default ExperimentCard;
