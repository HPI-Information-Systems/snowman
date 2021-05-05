import { RenderLogicActionTypes } from 'apps/SnowmanApp/types/RenderLogicActionTypes';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import { ViewIDs } from 'types/ViewIDs';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const navigateTo = (aTarget: ViewIDs): easyPrimitiveActionReturn =>
  easyPrimitiveAction<SnowmanAppModel>({
    type: RenderLogicActionTypes.NAVIGATE_TO,
    payload: aTarget,
  });

export const closeDialog = (instanceId?: ViewIDs): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: RenderLogicActionTypes.CLOSE_DIALOG,
    payload: instanceId,
  });

export let returnToPreviousDialog: () => easyPrimitiveActionReturn = closeDialog;

export const openDialog = (
  aDialog: ViewIDs,
  entityId?: number,
  entityType?: string
): SnowmanThunkAction<void, SnowmanAppModel> => (
  dispatch: SnowmanDispatch<SnowmanAppModel>,
  getState: () => SnowmanAppModel
): void => {
  const plainActionToReturnToCurrentDialog = {
    type: RenderLogicActionTypes.OPEN_DIALOG,
    payload: getState().RenderLogicStore.openedDialog,
    optionalPayload: getState().RenderLogicStore.entityId,
    optionalPayload2: getState().RenderLogicStore.entityType,
  };
  returnToPreviousDialog = (): easyPrimitiveActionReturn =>
    easyPrimitiveAction(plainActionToReturnToCurrentDialog);
  dispatch({
    type: RenderLogicActionTypes.OPEN_DIALOG,
    payload: aDialog,
    optionalPayload: entityId ?? null,
    optionalPayload2: entityType ?? null,
  });
};
