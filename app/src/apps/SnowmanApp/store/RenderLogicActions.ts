import { RenderLogicActionTypes } from 'apps/SnowmanApp/types/RenderLogicActionTypes';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
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

export const closeDialog = (
  dialogId?: ViewIDs,
  sensitive?: boolean
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: RenderLogicActionTypes.CLOSE_DIALOG,
    payload: dialogId,
    optionalPayload: sensitive === undefined ? false : sensitive,
  });

export const openDialog = (
  aDialog: ViewIDs,
  entityId?: number,
  entityType?: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: RenderLogicActionTypes.OPEN_DIALOG,
    payload: aDialog,
    optionalPayload: entityId ?? null,
    optionalPayload2: entityType ?? null,
  });
