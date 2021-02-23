import { InputChipStoreActionTypes } from 'store/actions/actionTypes';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const showInput = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: InputChipStoreActionTypes.SHOW_INPUT,
    // reducer ignores payload
    payload: false,
  });

export const hideInput = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: InputChipStoreActionTypes.HIDE_INPUT,
    // reducer ignores payload
    payload: false,
  });

export const changeInputValue = (
  newInputValue: string
): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    type: InputChipStoreActionTypes.CHANGE_INPUT_VALUE,
    payload: newInputValue,
  });
