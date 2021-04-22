import { FileResponse } from 'api';
import FilePreviewerView from 'components/FilePreviewer/FilePreviewer.View';
import {
  FilePreviewerDispatchProps,
  FilePreviewerStateProps,
} from 'components/FilePreviewer/FilePreviewerProps';
import { connect } from 'react-redux';
import { closePreviewer } from 'store/actions/ExperimentPreviewerActions';
import { SnowmanDispatch } from 'store/messages';
import { ImmediateStore } from 'store/models';
import { experimentTuplesLoader } from 'utils/tuplesLoaders';

const mapStateToProps = (state: ImmediateStore): FilePreviewerStateProps => ({
  fileName: state.ExperimentPreviewerStore.experiment?.name ?? 'unknown',
  isOpen: state.ExperimentPreviewerStore.isOpen,
  rowCount:
    state.ExperimentPreviewerStore.experiment?.numberOfUploadedRecords ?? 0,
  loadTuples:
    state.ExperimentPreviewerStore.experiment !== undefined
      ? experimentTuplesLoader(state.ExperimentPreviewerStore.experiment?.id)
      : (): Promise<FileResponse> => Promise.resolve({ data: [], header: [] }),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): FilePreviewerDispatchProps => ({
  closeDialog() {
    dispatch(closePreviewer());
  },
});

const ExperimentPreviewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilePreviewerView);

export default ExperimentPreviewer;
