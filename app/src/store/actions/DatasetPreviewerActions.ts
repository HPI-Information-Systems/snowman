import { Dataset } from 'api';
import { DatasetPreviewerStoreActionTypes } from 'store/actions/actionTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const openPreviewer = (aDataset: Dataset): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DatasetPreviewerStoreActionTypes.OPEN_DIALOG,
    payload: aDataset,
  });

export const closePreviewer = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DatasetPreviewerStoreActionTypes.CLOSE_DIALOG,
    // ignores payload
    payload: false,
  });
