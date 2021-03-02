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
import { Store } from 'store/models';
import { DatasetTypes } from 'types/DatasetTypes';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { convertFilesListToFilesArray } from 'utils/filesConverter';

const isValidDatasetDialog = (state: Store): boolean => {
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

const mapStateToProps = (state: Store): DatasetDialogStateProps => ({
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
  isValidForm: isValidDatasetDialog(state),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DatasetDialogDispatchProps => ({
  closeDialog(): void {
    (dispatch as SnowmanDispatch)(closeDialog());
  },
  clickOnCancel(): void {
    (dispatch as SnowmanDispatch)(closeDialog());
  },
  changeDatasetName(event: IonChangeEvent): void {
    (dispatch as SnowmanDispatch)(
      changeDatasetName(event.detail.value as string)
    );
  },
  changeDatasetDescription(event: IonChangeEvent): void {
    (dispatch as SnowmanDispatch)(
      changeDatasetDescription(event.detail.value as string)
    );
  },
  changeDatasetType(event: IonChangeEvent): void {
    (dispatch as SnowmanDispatch)(
      changeDatasetType(event.detail.value as DatasetTypes)
    );
  },
  changeDatasetLength(event: IonChangeEvent): void {
    (dispatch as SnowmanDispatch)(
      changeDatasetLength(Math.abs(parseInt(event.detail.value as string)))
    );
  },
  changeCsvIdColumn(event: IonChangeEvent): void {
    (dispatch as SnowmanDispatch)(
      changeDatasetCSVIdColumn(event.detail.value as string)
    );
  },
  changeCsvSeparator(event: IonChangeEvent): void {
    (dispatch as SnowmanDispatch)(
      changeDatasetCSVSeparator(event.detail.value as string)
    );
  },
  changeCsvQuote(event: IonChangeEvent): void {
    (dispatch as SnowmanDispatch)(
      changeDatasetCSVQuote(event.detail.value as string)
    );
  },
  changeCsvEscape(event: IonChangeEvent): void {
    (dispatch as SnowmanDispatch)(
      changeDatasetCSVEscape(event.detail.value as string)
    );
  },
  changeSelectedDatasetFiles(event: ChangeEvent<HTMLInputElement>): void {
    (dispatch as SnowmanDispatch)(
      setSelectedFiles(convertFilesListToFilesArray(event.target.files))
    );
  },
  clickOnATag(aTag: string): void {
    (dispatch as SnowmanDispatch)(clickOnDatasetTag(aTag));
  },
  addNewTagCallback(newTagValue: string): void {
    (dispatch as SnowmanDispatch)(addNewTag(newTagValue));
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
