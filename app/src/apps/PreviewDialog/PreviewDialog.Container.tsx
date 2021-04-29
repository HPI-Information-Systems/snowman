import { Dataset, Experiment } from 'api';
import PreviewDialogView from 'apps/PreviewDialog/PreviewDialog.View';
import { PreviewDialogStateProps } from 'apps/PreviewDialog/PreviewDialogProps';
import { PreviewDialogModel } from 'apps/PreviewDialog/types/PreviewDialogModel';
import { PreviewDialogTypes } from 'apps/PreviewDialog/types/PreviewDialogTypes';
import { connect } from 'react-redux';
import {
  datasetTuplesLoader,
  dummyTuplesLoader,
  experimentTuplesLoader,
} from 'utils/tuplesLoaders';

const mapStateToProps = (
  state: PreviewDialogModel
): PreviewDialogStateProps => {
  if (
    state.type === PreviewDialogTypes.DATASET &&
    state.dataset !== undefined
  ) {
    const dataset: Dataset = state.dataset;
    return {
      fileName: dataset.name,
      rowCount: dataset.numberOfUploadedRecords ?? 0,
      loadTuples: datasetTuplesLoader(dataset.id),
    };
  } else if (
    state.type === PreviewDialogTypes.EXPERIMENT &&
    state.experiment !== undefined
  ) {
    const experiment: Experiment = state.experiment;
    return {
      fileName: experiment.name,
      rowCount: experiment.numberOfUploadedRecords ?? 0,
      loadTuples: experimentTuplesLoader(experiment.id),
    };
  } else {
    return {
      fileName: 'none',
      loadTuples: dummyTuplesLoader,
      rowCount: 0,
    };
  }
};

const PreviewDialogContainer = connect(mapStateToProps)(PreviewDialogView);

export default PreviewDialogContainer;
