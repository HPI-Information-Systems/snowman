import { Dataset } from 'api';
import { DatasetsPageActionTypes } from 'store/actions/actionTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const clickOnDataset = (aDataset: Dataset): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DatasetsPageActionTypes.CLICK_ON_DATASET,
    payload: aDataset,
  });

export const clickOnDatasetCategory = (
  aCategory: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: DatasetsPageActionTypes.CLICK_ON_DATASET_CATEGORY,
    payload: aCategory,
  });
