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

export const openDialog = (
  aDialog: ViewIDs,
  entityId?: number
): easyPrimitiveActionReturn<SnowmanAppModel> =>
  easyPrimitiveAction<SnowmanAppModel>({
    type: RenderLogicActionTypes.OPEN_DIALOG,
    payload: aDialog,
    optionalPayload: entityId ?? null,
  });

export const doOpenDialog = (aDialog: ViewIDs, entityId?: number): void => {
  SnowmanAppDispatch(openDialog(aDialog, entityId));
};

export const closeDialog = (): easyPrimitiveActionReturn<SnowmanAppModel> =>
  easyPrimitiveAction({
    type: RenderLogicActionTypes.CLOSE_DIALOG,
    // reducer ignores payload
    payload: null,
  });

export const doCloseDialog = (): void => {
  SnowmanAppDispatch(closeDialog());
};
