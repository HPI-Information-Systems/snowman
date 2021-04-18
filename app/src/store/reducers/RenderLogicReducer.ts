import { RenderStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { ImmediateStore, RenderLogicStore, Store } from 'store/models';
import { viewIdQueryParam } from 'types/ViewIdQueryParam';
import { ViewIDs } from 'types/ViewIDs';
import { couldNavigateToView } from 'utils/viewMetaInfoHandlers';

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

/*const handleNavigateToViewId = (
  targetViewID: ViewIDs,
  baseline: RenderLogicStore = initialRenderLogicState,
  immediateState: ImmediateStore
): Store => {
  if (couldNavigateToView(targetViewID, immediateState)) {
    return {
      ...immediateState,
      RenderLogicStore: {
        currentViewID: targetViewID,
      },
    };
  }
  return {
    ...immediateState,
    RenderLogicStore: baseline,
  };
};*/

export const RenderLogicReducer = (
  baseline: RenderLogicStore = initialRenderLogicState,
  action: SnowmanAction
): RenderLogicStore => {
  switch (action.type) {
    default:
      return baseline;
  }
};
