import { Dataset } from 'api';
import { DatasetDialogActionTypes } from 'apps/DatasetDialog/types/DatasetDialogActionTypes';
import { DatasetDialogModel } from 'apps/DatasetDialog/types/DatasetDialogModel';
import { CentralResourcesGenericActionsTypes } from 'apps/SnowmanApp/types/CentralResourcesGenericActionsTypes';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { uniq } from 'lodash';
import { intersection } from 'lodash';
import { DatasetTypes } from 'types/DatasetTypes';
import { SnowmanAction } from 'types/SnowmanAction';
import { getTagsFromDatasets } from 'utils/tagFactory';
import { toggleSelectionArrayMultipleSelect } from 'utils/toggleSelectionArray';

const initialState: DatasetDialogModel = {
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

const DatasetDialogReducer = (
  state: DatasetDialogModel = initialState,
  action: SnowmanAction
): DatasetDialogModel => {
  switch (action.type) {
    case CentralResourcesGenericActionsTypes.REFRESHED: {
      const tags = getTagsFromDatasets(
        (action.payload as CentralResourcesModel).datasets
      );
      return {
        ...state,
        availableTags: tags,
        selectedTags: intersection(state.selectedTags, tags),
      };
    }
    case DatasetDialogActionTypes.RESET_DIALOG:
      return {
        ...initialState,
        availableTags: state.availableTags,
      };
    case DatasetDialogActionTypes.PREFILL_DIALOG: {
      const dataset = action.payload as Dataset;
      return {
        ...initialState,
        datasetName: dataset.name,
        datasetDescription: dataset.description ?? '',
        datasetLength: dataset.numberOfRecords ?? 0,
        selectedTags: dataset.tags ?? [],
        availableTags: state.availableTags,
      };
    }
    case DatasetDialogActionTypes.CHANGE_DATASET_NAME:
      return {
        ...state,
        datasetName: action.payload as string,
      };
    case DatasetDialogActionTypes.CHANGE_DATASET_DESCRIPTION:
      return {
        ...state,
        datasetDescription: action.payload as string,
      };
    case DatasetDialogActionTypes.CHANGE_DATASET_TYPE:
      return {
        ...state,
        datasetType: action.payload as DatasetTypes,
      };
    case DatasetDialogActionTypes.CHANGE_DATASET_FILES:
      return {
        ...state,
        selectedFiles: action.payload as File[],
      };
    case DatasetDialogActionTypes.CHANGE_DATASET_LENGTH:
      return {
        ...state,
        datasetLength: action.payload as number,
      };
    case DatasetDialogActionTypes.CHANGE_CSV_ID_COLUMN:
      return {
        ...state,
        csvIdColumn: action.payload as string,
      };
    case DatasetDialogActionTypes.CHANGE_CSV_SEPARATOR:
      return {
        ...state,
        csvSeparator: action.payload as string,
      };
    case DatasetDialogActionTypes.CHANGE_CSV_QUOTE:
      return {
        ...state,
        csvQuote: action.payload as string,
      };
    case DatasetDialogActionTypes.CHANGE_CSV_ESCAPE:
      return {
        ...state,
        csvEscape: action.payload as string,
      };
    case DatasetDialogActionTypes.CLICK_ON_DATASET_TAG:
      return {
        ...state,
        selectedTags: toggleSelectionArrayMultipleSelect(
          state.selectedTags,
          action.payload as string
        ),
      };
    case DatasetDialogActionTypes.ADD_DATASET_TAG:
      return {
        ...state,
        availableTags: uniq([...state.availableTags, action.payload as string]),
        selectedTags: uniq([...state.selectedTags, action.payload as string]),
      };
    default:
      return state;
  }
};

export default DatasetDialogReducer;
