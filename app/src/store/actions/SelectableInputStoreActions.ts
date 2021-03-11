import { SelectableInputStoreActionTypes } from 'store/actions/actionTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const showPopover = (anEvent: Event): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: SelectableInputStoreActionTypes.SHOW_POPOVER,
    payload: anEvent,
  });

export const closePopover = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: SelectableInputStoreActionTypes.CLOSE_POPOVER,
    // reducer ignores payload
    payload: false,
  });

export const setSearchString = (aString: string): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: SelectableInputStoreActionTypes.CHANGE_SEARCH_STRING,
    payload: aString,
  });

export const resetElement = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: SelectableInputStoreActionTypes.RESET_COMPONENT,
    // reducer ignores payload
    payload: false,
  });
