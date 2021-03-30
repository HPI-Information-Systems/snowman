import { Dataset } from 'api';
import { DatasetPreviewerStoreActionTypes } from 'store/actions/actionTypes';
import { couldPreviewDataset } from 'utils/datasetHelper';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
  easyPrimitiveDumpAction,
} from 'utils/easyActionsFactory';

export const openPreviewer = (aDataset: Dataset): easyPrimitiveActionReturn =>
  couldPreviewDataset(aDataset)
    ? easyPrimitiveAction({
        type: DatasetPreviewerStoreActionTypes.OPEN_DIALOG,
        payload: aDataset,
      })
    : easyPrimitiveDumpAction();

export const closePreviewer = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DatasetPreviewerStoreActionTypes.CLOSE_DIALOG,
    // ignores payload
    payload: false,
  });
