import { RouterStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { ImmediateStore, RenderLogicStore, Store } from 'store/models';
import { ViewIDs } from 'types/ViewIDs';
import { couldNavigateToView, getNextViewId } from 'utils/viewMetaInfoHandlers';

export const initialRenderLogicState: RenderLogicStore = {
  currentViewID: ViewIDs.HOME,
  couldGoNext: true,
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
        couldGoNext: couldNavigateToView(
          getNextViewId({
            currentViewID: targetViewID,
            // getNextViewId ignores access guard
            couldGoNext: false,
          }),
          immediateState
        ),
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
    case actionTypes.NAVIGATE_NEXT:
      return handleNavigateToViewId(
        getNextViewId(baseline),
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
      let couldGoNext: boolean;
      try {
        couldGoNext = couldNavigateToView(
          getNextViewId(baseline),
          immediateState
        );
      } catch {
        couldGoNext = true;
      }
      return {
        ...immediateState,
        RenderLogicStore: {
          ...baseline,
          couldGoNext: couldGoNext,
        },
      };
    }
  }
};
