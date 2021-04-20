import DatasetDialogView from 'apps/DatasetDialog/DatasetDialog.View';
import {
  DatasetDialogDispatchProps,
  DatasetDialogOwnProps,
  DatasetDialogStateProps,
} from 'apps/DatasetDialog/DatasetDialogProps';
import {
  addNewTag,
  addOrUpdateDataset,
  changeDatasetCSVEscape,
  changeDatasetCSVIdColumn,
  changeDatasetCSVQuote,
  changeDatasetCSVSeparator,
  changeDatasetDescription,
  changeDatasetLength,
  changeDatasetName,
  changeDatasetType,
  clickOnDatasetTag,
  setSelectedFiles,
} from 'apps/DatasetDialog/store/DatasetDialogActions';
import { DatasetDialogModel } from 'apps/DatasetDialog/types/DatasetDialogModel';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { DatasetTypes } from 'types/DatasetTypes';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { convertFilesListToFilesArray } from 'utils/filesConverter';

const isValidDatasetDialog = (state: DatasetDialogModel): boolean => {
  // Dataset name shall not be empty
  if (state.datasetName.length === 0) return false;
  // If dataset should be uploaded, select files
  if (
    state.datasetType === DatasetTypes.full &&
    state.selectedFiles.length === 0 &&
    // rule applies only if AddDialog
    state.datasetId === null
  ) {
    return false;
  }
  // If dataset not to be uploaded, specify its size
  return !(
    state.datasetType === DatasetTypes.skeleton && state.datasetLength === 0
  );
};

const mapStateToProps = (
  state: DatasetDialogModel
): DatasetDialogStateProps => ({
  isAddDialog: state.datasetId === null,
  datasetName: state.datasetName,
  datasetDescription: state.datasetDescription,
  datasetType: state.datasetType,
  datasetLength: state.datasetLength,
  tags: state.availableTags,
  selectedTags: state.selectedTags,
  selectedFiles: state.selectedFiles,
  csvIdColumn: state.csvIdColumn,
  csvSeparator: state.csvSeparator,
  csvQuote: state.csvQuote,
  csvEscape: state.csvEscape,
  isValidAnsweredDialog: isValidDatasetDialog(state),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<DatasetDialogModel>,
  ownProps: DatasetDialogOwnProps
): DatasetDialogDispatchProps => ({
  clickOnCancel(): void {
    doCloseDialog();
  },
  changeDatasetName(event: IonChangeEvent): void {
    dispatch(changeDatasetName(event.detail.value as string));
  },
  changeDatasetDescription(event: IonChangeEvent): void {
    dispatch(changeDatasetDescription(event.detail.value as string));
  },
  changeDatasetType(event: IonChangeEvent): void {
    dispatch(changeDatasetType(event.detail.value as DatasetTypes));
  },
  changeDatasetLength(event: IonChangeEvent): void {
    dispatch(
      changeDatasetLength(Math.abs(parseInt(event.detail.value as string)))
    );
  },
  changeCsvIdColumn(event: IonChangeEvent): void {
    dispatch(changeDatasetCSVIdColumn(event.detail.value as string));
  },
  changeCsvSeparator(event: IonChangeEvent): void {
    dispatch(changeDatasetCSVSeparator(event.detail.value as string));
  },
  changeCsvQuote(event: IonChangeEvent): void {
    dispatch(changeDatasetCSVQuote(event.detail.value as string));
  },
  changeCsvEscape(event: IonChangeEvent): void {
    dispatch(changeDatasetCSVEscape(event.detail.value as string));
  },
  changeSelectedDatasetFiles(event: ChangeEvent<HTMLInputElement>): void {
    dispatch(
      setSelectedFiles(convertFilesListToFilesArray(event.target.files))
    );
  },
  clickOnATag(aTag: string): void {
    dispatch(clickOnDatasetTag(aTag));
  },
  createTag(newTagValue: string): void {
    dispatch(addNewTag(newTagValue));
  },
  clickOnSubmit(): void {
    dispatch(addOrUpdateDataset(ownProps.entityId)).then();
  },
});

const DatasetDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDialogView);

export default DatasetDialogContainer;
