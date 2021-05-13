import { CentralResourcesGenericActionsTypes } from 'apps/SnowmanApp/types/CentralResourcesGenericActionsTypes';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

export const centralResourcesRefreshed = (
  dispatch: SnowmanDispatch<unknown>,
  newCentralResources: CentralResourcesModel
): void => {
  dispatch({
    type: CentralResourcesGenericActionsTypes.REFRESHED,
    payload: newCentralResources,
  });
};
