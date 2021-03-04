import { Dataset } from 'api';
import { uniq } from 'lodash';
import { DatasetDialogStoreActionTypes as DialogActions } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { DatasetDialogStore } from 'store/models';
import { DatasetTypes } from 'types/DatasetTypes';
import { DialogTypes } from 'types/DialogTypes';
import { toggleSelectionArrayMultipleSelect } from 'utils/toggleSelectionArray';

const initialState: DatasetDialogStore = {
  isOpen: false,
  datasetId: null,
  dialogType: DialogTypes.ADD_DIALOG,
  availableTags: [],
  datasetName: '',
  datasetDescription: '',
  datasetType: DatasetTypes.full,
  datasetLength: 0,
  csvIdColumn: 'id',
  csvSeparator: ',',
  csvQuote: '"',
  csvEscape: "'",
  selectedTags: [],
  selectedFiles: [],
};

export const DatasetDialogReducer = (
  state: DatasetDialogStore = initialState,
  action: SnowmanAction
): DatasetDialogStore => {
  switch (action.type) {
    case DialogActions.OPEN_ADD_DIALOG:
      return {
        ...state,
        dialogType: DialogTypes.ADD_DIALOG,
        isOpen: true,
      };
    case DialogActions.OPEN_CHANGE_DIALOG:
      return {
        ...state,
        isOpen: true,
        dialogType: DialogTypes.CHANGE_DIALOG,
        datasetId: (action.payload as Dataset).id,
        datasetName: (action.payload as Dataset).name,
        datasetDescription: (action.payload as Dataset).description ?? '',
        datasetLength: (action.payload as Dataset).numberOfRecords ?? 0,
        selectedTags: (action.payload as Dataset).tags ?? [],
      };
    case DialogActions.CLOSE_DIALOG:
      if (state.dialogType === DialogTypes.ADD_DIALOG)
        // Only keep current state for add dialog
        return {
          ...state,
          isOpen: false,
        };
      else {
        return initialState;
      }
    case DialogActions.RESET_DIALOG:
      return initialState;
    case DialogActions.LOAD_AVAILABLE_TAGS:
      return {
        ...state,
        availableTags: action.payload as string[],
      };
    case DialogActions.CHANGE_DATASET_NAME:
      return {
        ...state,
        datasetName: action.payload as string,
      };
    case DialogActions.CHANGE_DATASET_DESCRIPTION:
      return {
        ...state,
        datasetDescription: action.payload as string,
      };
    case DialogActions.CHANGE_DATASET_TYPE:
      return {
        ...state,
        datasetType: action.payload as DatasetTypes,
      };
    case DialogActions.CHANGE_DATASET_FILES:
      return {
        ...state,
        selectedFiles: action.payload as File[],
      };
    case DialogActions.CHANGE_DATASET_LENGTH:
      return {
        ...state,
        datasetLength: action.payload as number,
      };
    case DialogActions.CHANGE_CSV_ID_COLUMN:
      return {
        ...state,
        csvIdColumn: action.payload as string,
      };
    case DialogActions.CHANGE_CSV_SEPARATOR:
      return {
        ...state,
        csvSeparator: action.payload as string,
      };
    case DialogActions.CHANGE_CSV_QUOTE:
      return {
        ...state,
        csvQuote: action.payload as string,
      };
    case DialogActions.CHANGE_CSV_ESCAPE:
      return {
        ...state,
        csvEscape: action.payload as string,
      };
    case DialogActions.CLICK_ON_DATASET_TAG:
      return {
        ...state,
        selectedTags: toggleSelectionArrayMultipleSelect(
          state.selectedTags,
          action.payload as string
        ),
      };
    case DialogActions.ADD_DATASET_TAG:
      return {
        ...state,
        availableTags: uniq([...state.availableTags, action.payload as string]),
      };
    default:
      return state;
  }
};
