import { uniq } from 'lodash';
import { DatasetDialogStoreActionTypes as DialogActionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { DatasetDialogStore } from 'store/models';
import { DatasetTypes } from 'types/DatasetTypes';
import { toggleSelectionArrayMultipleSelect } from 'utils/toggleSelectionArray';

const initialState: DatasetDialogStore = {
  isOpen: false,
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
    case DialogActionTypes.OPEN_DIALOG:
      return {
        ...state,
        availableTags: action.payload as string[],
        isOpen: true,
      };
    case DialogActionTypes.CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false,
      };
    case DialogActionTypes.RESET_DIALOG:
      return initialState;
    case DialogActionTypes.CHANGE_DATASET_NAME:
      return {
        ...state,
        datasetName: action.payload as string,
      };
    case DialogActionTypes.CHANGE_DATASET_DESCRIPTION:
      return {
        ...state,
        datasetDescription: action.payload as string,
      };
    case DialogActionTypes.CHANGE_DATASET_TYPE:
      return {
        ...state,
        datasetType: action.payload as DatasetTypes,
      };
    case DialogActionTypes.CHANGE_DATASET_FILES:
      return {
        ...state,
        selectedFiles: action.payload as File[],
      };
    case DialogActionTypes.CHANGE_DATASET_LENGTH:
      return {
        ...state,
        datasetLength: action.payload as number,
      };
    case DialogActionTypes.CHANGE_CSV_ID_COLUMN:
      return {
        ...state,
        csvIdColumn: action.payload as string,
      };
    case DialogActionTypes.CHANGE_CSV_SEPARATOR:
      return {
        ...state,
        csvSeparator: action.payload as string,
      };
    case DialogActionTypes.CHANGE_CSV_QUOTE:
      return {
        ...state,
        csvQuote: action.payload as string,
      };
    case DialogActionTypes.CHANGE_CSV_ESCAPE:
      return {
        ...state,
        csvEscape: action.payload as string,
      };
    case DialogActionTypes.CLICK_ON_DATASET_TAG:
      return {
        ...state,
        selectedTags: toggleSelectionArrayMultipleSelect(
          state.selectedTags,
          action.payload as string
        ),
      };
    case DialogActionTypes.ADD_DATASET_TAG:
      return {
        ...state,
        availableTags: uniq([...state.availableTags, action.payload as string]),
      };
    default:
      return state;
  }
};
