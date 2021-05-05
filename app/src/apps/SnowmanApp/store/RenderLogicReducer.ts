import { RenderLogicActionTypes } from 'apps/SnowmanApp/types/RenderLogicActionTypes';
import { RenderLogicModel } from 'apps/SnowmanApp/types/RenderLogicModel';
import { head } from 'lodash';
import { EntityId } from 'types/EntityId';
import { EntityType } from 'types/EntityType';
import { SnowmanAction } from 'types/SnowmanAction';
import { viewIdQueryParam } from 'types/ViewIdQueryParam';
import { ViewIDs } from 'types/ViewIDs';

const getInitialViewId = (): ViewIDs => {
  const params = new URLSearchParams(window.location.search);
  const viewId = params.get(viewIdQueryParam);
  if (viewId) {
    const parsedViewId = parseInt(viewId);
    if (parsedViewId in ViewIDs) {
      return parsedViewId;
    }
  }
  return ViewIDs.BenchmarkApp;
};

const initialRenderLogicState: RenderLogicModel = {
  currentViewID: getInitialViewId(),
  entityId: null,
  dialogStack: [],
};

const RenderLogicReducer = (
  state: RenderLogicModel = initialRenderLogicState,
  action: SnowmanAction
): RenderLogicModel => {
  switch (action.type) {
    case RenderLogicActionTypes.NAVIGATE_TO:
      return {
        ...state,
        currentViewID: action.payload as ViewIDs,
      };
    case RenderLogicActionTypes.OPEN_DIALOG:
      return {
        ...state,
        dialogStack: [
          {
            entityId: action.optionalPayload as EntityId,
            entityType: action.optionalPayload2 as EntityType,
            dialogId: action.payload as ViewIDs,
          },
          ...state.dialogStack,
        ],
      };
    case RenderLogicActionTypes.CLOSE_DIALOG: {
      if (head(state.dialogStack)?.dialogId === (action.payload as ViewIDs))
        return {
          ...state,
          dialogStack: state.dialogStack.slice(1),
        };
      return state;
    }
    default:
      return state;
  }
};

export default RenderLogicReducer;
