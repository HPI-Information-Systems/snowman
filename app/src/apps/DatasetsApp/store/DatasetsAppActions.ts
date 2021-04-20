import { DatasetsAppActionsTypes } from 'apps/DatasetsApp/types/DatasetsAppActionTypes';
import { DatasetsAppModel } from 'apps/DatasetsApp/types/DatasetsAppModel';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const toggleTag = (
  aTag: string
): easyPrimitiveActionReturn<DatasetsAppModel> =>
  easyPrimitiveAction<DatasetsAppModel>({
    type: DatasetsAppActionsTypes.TOGGLE_TAG,
    payload: aTag,
  });
