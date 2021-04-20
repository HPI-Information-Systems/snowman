import { FileResponse } from 'api';
import FilePreviewerView from 'components/FilePreviewer/FilePreviewer.View';
import {
  FilePreviewerDispatchProps,
  FilePreviewerStateProps,
} from 'components/FilePreviewer/FilePreviewerProps';
import { connect } from 'react-redux';
import { closePreviewer } from 'store/actions/DatasetPreviewerActions';
import { datasetTuplesLoader } from 'store/actions/DatasetsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { ImmediateStore } from 'store/models';

const mapStateToProps = (state: ImmediateStore): FilePreviewerStateProps => ({
  fileName: state.DatasetPreviewerStore.dataset?.name ?? 'unknown',
  isOpen: state.DatasetPreviewerStore.isOpen,
  rowCount: state.DatasetPreviewerStore.dataset?.numberOfUploadedRecords ?? 0,
  loadTuples:
    state.DatasetPreviewerStore.dataset !== undefined
      ? datasetTuplesLoader(state.DatasetPreviewerStore.dataset.id)
      : (): Promise<FileResponse> => Promise.resolve({ data: [], header: [] }),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): FilePreviewerDispatchProps => ({
  closeDialog() {
    dispatch(closePreviewer());
  },
});

const DatasetPreviewer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilePreviewerView);

export default DatasetPreviewer;
