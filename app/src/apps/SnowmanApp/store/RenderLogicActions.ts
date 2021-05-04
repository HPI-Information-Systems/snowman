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

export const openDialog = (
  aDialog: ViewIDs,
  entityId?: number,
  entityType?: string
): easyPrimitiveActionReturn<SnowmanAppModel> =>
  easyPrimitiveAction<SnowmanAppModel>({
    type: RenderLogicActionTypes.OPEN_DIALOG,
    payload: aDialog,
    optionalPayload: entityId ?? null,
    optionalPayload2: entityType ?? null,
  });

export const closeDialog = (
  instanceId?: ViewIDs
): easyPrimitiveActionReturn<SnowmanAppModel> =>
  easyPrimitiveAction({
    type: RenderLogicActionTypes.CLOSE_DIALOG,
    payload: instanceId,
  });
