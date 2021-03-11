import { Dataset } from 'api';
import { isEqual } from 'lodash';
import { DatasetStoreActionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { DatasetsStore } from 'store/models';
import { doesDatasetMatchTags } from 'utils/datasetHelper';
import { toggleSelectionArrayMultipleSelect } from 'utils/toggleSelectionArray';

const initialState: DatasetsStore = {
  datasets: [],
  selectedDatasetTags: [],
  selectedDataset: null,
};

export const DatasetsReducer = (
  state: DatasetsStore = initialState,
  action: SnowmanAction
): DatasetsStore => {
  switch (action.type) {
    case DatasetStoreActionTypes.SET_ALL_DATASETS:
      return {
        ...state,
        datasets: action.payload as Dataset[],
      };
    case DatasetStoreActionTypes.CLICK_ON_DATASET:
      return {
        ...state,
        selectedDataset: isEqual(
          action.payload as Dataset,
          state.selectedDataset
        )
          ? null
          : (action.payload as Dataset),
      };
    case DatasetStoreActionTypes.RESET_SELECTED_DATASET:
      return {
        ...state,
        selectedDataset: null,
      };
    case DatasetStoreActionTypes.CLICK_ON_DATASET_TAG: {
      const resultingTags = toggleSelectionArrayMultipleSelect(
        state.selectedDatasetTags,
        action.payload as string
      ) as string[];
      return {
        ...state,
        selectedDatasetTags: resultingTags,
        selectedDataset: doesDatasetMatchTags(
          state.selectedDataset,
          resultingTags
        )
          ? state.selectedDataset
          : null,
      };
    }
    default:
      return state;
  }
};
