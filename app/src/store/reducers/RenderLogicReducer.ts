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

const handleNavigateToViewId = (
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
};

export const RenderLogicReducer = (
  baseline: RenderLogicStore = initialRenderLogicState,
  immediateState: ImmediateStore,
  action: SnowmanAction
): Store => {
  switch (action.type) {
    case actionTypes.NAVIGATE_TO:
      return handleNavigateToViewId(
        action.payload as ViewIDs,
        baseline,
        immediateState
      );
    /*
      Related to javascript import routines,
      helper functions are not fully initialized when the reducer is called the first time.
      It is the default path that is evaluated the first time.
      To allow a basic default path as well as a structured initialization,
      we catch possible errors thrown by uninitialized helpers and return a default value.
       */
    default: {
      return {
        ...immediateState,
        RenderLogicStore: {
          ...baseline,
        },
      };
    }
  }
};
