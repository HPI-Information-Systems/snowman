import { DatasetsAppActionsTypes } from 'apps/DatasetsApp/types/DatasetsAppActionTypes';
import { DatasetsAppModel } from 'apps/DatasetsApp/types/DatasetsAppModel';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
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

export const checkConsistency = (
  newCentralResources: CentralResourcesModel
): SnowmanThunkAction<void, DatasetsAppModel> => (
  dispatch: SnowmanDispatch<DatasetsAppModel>
): void => {
  console.log('Hallo');
};
