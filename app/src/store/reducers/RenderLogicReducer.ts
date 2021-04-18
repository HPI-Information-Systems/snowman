import { RenderLogicStoreActionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { RenderLogicStore } from 'store/models';
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
  return ViewIDs.HOME;
};

const initialRenderLogicState: RenderLogicStore = {
  currentViewID: getInitialViewId(),
};

export const RenderLogicReducer = (
  state: RenderLogicStore = initialRenderLogicState,
  action: SnowmanAction
): RenderLogicStore => {
  switch (action.type) {
    case RenderLogicStoreActionTypes.NAVIGATE_TO:
      return {
        ...state,
        currentViewID: action.payload as ViewIDs,
      };
    default:
      return state;
  }
};
