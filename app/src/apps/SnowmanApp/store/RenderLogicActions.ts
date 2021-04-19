import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { RenderLogicActionTypes } from 'apps/SnowmanApp/types/RenderLogicActionTypes';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { ViewIDs } from 'types/ViewIDs';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const navigateTo = (
  aTarget: ViewIDs
): easyPrimitiveActionReturn<SnowmanAppModel> =>
  easyPrimitiveAction<SnowmanAppModel>({
    type: RenderLogicActionTypes.NAVIGATE_TO,
    payload: aTarget,
  });

export const doNavigateTo = (aTarget: ViewIDs): void => {
  SnowmanAppDispatch(navigateTo(aTarget));
};
