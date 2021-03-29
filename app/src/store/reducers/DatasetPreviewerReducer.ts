import { Dataset } from 'api';
import { DatasetPreviewerStoreActionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { DatasetPreviewerStore } from 'store/models';

const initialState: DatasetPreviewerStore = {
  isOpen: false,
  dataset: undefined,
};

export const DatasetPreviewerReducer = (
  state: DatasetPreviewerStore = initialState,
  action: SnowmanAction
): DatasetPreviewerStore => {
  switch (action.type) {
    case DatasetPreviewerStoreActionTypes.OPEN_DIALOG:
      return {
        ...state,
        isOpen: true,
        dataset: action.payload as Dataset,
      };
    case DatasetPreviewerStoreActionTypes.CLOSE_DIALOG:
      return {
        ...state,
        isOpen: false,
        dataset: undefined,
      };
    default:
      return state;
  }
};
