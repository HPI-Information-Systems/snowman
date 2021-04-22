import { SelectableInputActionTypes } from 'components/SelectableInput/types/SelectableInputActionTypes';
import { SelectableInputModel } from 'components/SelectableInput/types/SelectableInputModel';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const showPopover = (
  anEvent: Event
): easyPrimitiveActionReturn<SelectableInputModel> =>
  easyPrimitiveAction<SelectableInputModel>({
    type: SelectableInputActionTypes.SHOW_POPOVER,
    payload: anEvent,
  });

export const closePopover = (): easyPrimitiveActionReturn<SelectableInputModel> =>
  easyPrimitiveAction<SelectableInputModel>({
    type: SelectableInputActionTypes.CLOSE_POPOVER,
    // reducer ignores payload
    payload: false,
  });

export const setSearchString = (
  aString: string
): easyPrimitiveActionReturn<SelectableInputModel> =>
  easyPrimitiveAction<SelectableInputModel>({
    type: SelectableInputActionTypes.CHANGE_SEARCH_STRING,
    payload: aString,
  });

export const resetElement = (): easyPrimitiveActionReturn<SelectableInputModel> =>
  easyPrimitiveAction<SelectableInputModel>({
    type: SelectableInputActionTypes.RESET_COMPONENT,
    // reducer ignores payload
    payload: false,
  });
