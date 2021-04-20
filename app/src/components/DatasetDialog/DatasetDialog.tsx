import DatasetDialogView from 'components/DatasetDialog/DatasetDialog.View';
import {
  DatasetDialogDispatchProps,
  DatasetDialogStateProps,
} from 'components/DatasetDialog/DatasetDialogProps';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
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
  closeDialog,
  setSelectedFiles,
} from 'store/actions/DatasetDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { ImmediateStore } from 'store/models';
import { MagicNotPossibleId } from 'structs/constants';
import { DatasetTypes } from 'types/DatasetTypes';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { convertFilesListToFilesArray } from 'utils/filesConverter';

const isValidDatasetDialog = (state: ImmediateStore): boolean => {
  // Dataset name shall not be empty
  if (state.DatasetDialogStore.datasetName.length === 0) return false;
  // If dataset should be uploaded, select files
  if (
    state.DatasetDialogStore.datasetType === DatasetTypes.full &&
    state.DatasetDialogStore.selectedFiles.length === 0 &&
    // rule applies only if AddDialog
    state.DatasetDialogStore.datasetId === null
  ) {
    return false;
  }
  // If dataset not to be uploaded, specify its size
  return !(
    state.DatasetDialogStore.datasetType === DatasetTypes.skeleton &&
    state.DatasetDialogStore.datasetLength === 0
  );
};

const mapStateToProps = (state: ImmediateStore): DatasetDialogStateProps => ({
  isAddDialog: state.DatasetDialogStore.datasetId === null,
  isOpen: state.DatasetDialogStore.isOpen,
  datasetName: state.DatasetDialogStore.datasetName,
  datasetDescription: state.DatasetDialogStore.datasetDescription,
  datasetType: state.DatasetDialogStore.datasetType,
  datasetLength: state.DatasetDialogStore.datasetLength,
  tags: state.DatasetDialogStore.availableTags,
  selectedTags: state.DatasetDialogStore.selectedTags,
  selectedFiles: state.DatasetDialogStore.selectedFiles,
  csvIdColumn: state.DatasetDialogStore.csvIdColumn,
  csvSeparator: state.DatasetDialogStore.csvSeparator,
  csvQuote: state.DatasetDialogStore.csvQuote,
  csvEscape: state.DatasetDialogStore.csvEscape,
  isValidAnsweredDialog: isValidDatasetDialog(state),
  datasetId: state.DatasetDialogStore.datasetId ?? MagicNotPossibleId,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DatasetDialogDispatchProps => ({
  closeDialog(): void {
    dispatch(closeDialog());
  },
  clickOnCancel(): void {
    dispatch(closeDialog());
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
    dispatch(addOrUpdateDataset()).then();
  },
});

const DatasetDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDialogView);

export default DatasetDialog;
