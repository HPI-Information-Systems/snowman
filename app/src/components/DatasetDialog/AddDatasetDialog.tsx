import AddDatasetDialogView from 'components/DatasetDialog/AddDatasetDialog.View';
import {
  AddDatasetDialogDispatchProps,
  AddDatasetDialogStateProps,
} from 'components/DatasetDialog/AddDatasetDialogProps';
import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import {
  addNewDataset,
  addNewTag,
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
  resetDialog,
  setSelectedFiles,
} from 'store/actions/AddDatasetDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { DatasetTypes } from 'types/DatasetTypes';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { convertFilesListToFilesArray } from 'utils/filesConverter';

const isValidDatasetDialog = (state: Store): boolean => {
  // Dataset name shall not be empty
  if (state.AddDatasetDialogStore.datasetName.length === 0) return false;
  // If dataset should be uploaded, select files
  if (
    state.AddDatasetDialogStore.datasetType === DatasetTypes.full &&
    state.AddDatasetDialogStore.selectedFiles.length === 0
  ) {
    return false;
  }
  // If dataset not to be uploaded, specify its size
  return !(
    state.AddDatasetDialogStore.datasetType === DatasetTypes.skeleton &&
    state.AddDatasetDialogStore.datasetLength === 0
  );
};

const mapStateToProps = (state: Store): AddDatasetDialogStateProps => ({
  isOpen: state.AddDatasetDialogStore.isOpen,
  datasetName: state.AddDatasetDialogStore.datasetName,
  datasetDescription: state.AddDatasetDialogStore.datasetDescription,
  datasetType: state.AddDatasetDialogStore.datasetType,
  datasetLength: state.AddDatasetDialogStore.datasetLength,
  tags: state.AddDatasetDialogStore.availableTags,
  selectedTags: state.AddDatasetDialogStore.selectedTags,
  selectedFiles: state.AddDatasetDialogStore.selectedFiles,
  csvIdColumn: state.AddDatasetDialogStore.csvIdColumn,
  csvSeparator: state.AddDatasetDialogStore.csvSeparator,
  csvQuote: state.AddDatasetDialogStore.csvQuote,
  csvEscape: state.AddDatasetDialogStore.csvEscape,
  isValidForm: isValidDatasetDialog(state),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): AddDatasetDialogDispatchProps => ({
  closeDialog(): void {
    (dispatch as SnowmanDispatch)(closeDialog());
  },
  clickOnCancel(): void {
    (dispatch as SnowmanDispatch)(resetDialog());
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
  addDataset(): void {
    dispatch(addNewDataset()).then();
  },
});

const AddDatasetDialog = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDatasetDialogView);

export default AddDatasetDialog;
