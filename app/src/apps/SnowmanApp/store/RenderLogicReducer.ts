import { RenderLogicActionTypes } from 'apps/SnowmanApp/types/RenderLogicActionTypes';
import { RenderLogicModel } from 'apps/SnowmanApp/types/RenderLogicModel';
import { SnowmanAction } from 'types/SnowmanAction';
import { ViewIDs } from 'types/ViewIDs';

const initialRenderLogicState: RenderLogicModel = {
  currentViewID: ViewIDs.HOME,
  openedDialog: null,
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
      };
    case RenderLogicActionTypes.CLOSE_DIALOG:
      return {
        ...state,
        openedDialog: null,
      };
    default:
      return state;
  }
};

export default RenderLogicReducer;
