import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { RenderLogicActionTypes } from 'apps/SnowmanApp/types/RenderLogicActionTypes';
import { SnowmanAction } from 'types/SnowmanAction';
import { ViewIDs } from 'types/ViewIDs';

export const navigateTo = (aTarget: ViewIDs): SnowmanAction => ({
  type: RenderLogicActionTypes.NAVIGATE_TO,
  payload: aTarget,
});

export const doNavigateTo = (aTarget: ViewIDs): void => {
  SnowmanAppDispatch(navigateTo(aTarget));
};
