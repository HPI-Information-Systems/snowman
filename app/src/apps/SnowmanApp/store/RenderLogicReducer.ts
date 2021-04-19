import { RenderLogicActionTypes } from 'apps/SnowmanApp/types/RenderLogicActionTypes';
import { RenderLogicModel } from 'apps/SnowmanApp/types/RenderLogicModel';
import { SnowmanAction } from 'types/SnowmanAction';
import { ViewIDs } from 'types/ViewIDs';

const initialRenderLogicState: RenderLogicModel = {
  currentViewID: ViewIDs.HOME,
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
    default:
      return state;
  }
};

export default RenderLogicReducer;
