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
  baseline: RenderLogicStore,
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
    default:
      return {
        ...immediateState,
        RenderLogicStore: {
          ...baseline,
          couldGoNext: couldNavigateToView(
            getNextViewId(baseline),
            immediateState
          ),
        },
      };
  }
};
