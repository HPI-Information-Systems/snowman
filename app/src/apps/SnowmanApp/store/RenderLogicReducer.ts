import { RenderLogicActionTypes } from 'apps/SnowmanApp/types/RenderLogicActionTypes';
import { RenderLogicModel } from 'apps/SnowmanApp/types/RenderLogicModel';
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
  openedDialog: null,
  entityId: null,
  entityType: null,
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
        openedDialog: action.payload as ViewIDs,
        entityId: action.optionalPayload as null | number,
        entityType: action.optionalPayload2 as null | string,
      };
    case RenderLogicActionTypes.CLOSE_DIALOG: {
      if (action.payload === state.openedDialog)
        return { ...state, openedDialog: null };
      return state;
    }
    default:
      return state;
  }
};

export default RenderLogicReducer;
