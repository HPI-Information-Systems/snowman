import { RenderStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { ViewIDs } from 'types/ViewIDs';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const navigateTo = (aTarget: ViewIDs): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.NAVIGATE_TO,
    payload: aTarget,
  });

export const navigateToNextPage = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: actionTypes.NAVIGATE_NEXT,
    // reducer ignores payload
    payload: false,
  });
