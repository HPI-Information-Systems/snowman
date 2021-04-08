import { SubmitCallback } from 'components/InputChip/InputChipProps';
import {
  createPrimitiveInputChipAction,
  primitiveInputChipActionReturn,
} from 'components/InputChip/store/easyActionsFactory';
import { store } from 'components/InputChip/store/InputChipStore';
import {
  InputChipActionTypes,
  InputChipDispatch,
  InputChipThunkAction,
} from 'components/InputChip/store/models';
import { KeyboardEvent } from 'react';

export const changeInputValue = (
  newInputValue: string
): primitiveInputChipActionReturn =>
  createPrimitiveInputChipAction({
    type: InputChipActionTypes.CHANGE_VALUE,
    payload: newInputValue,
  });

export const showInput = (): primitiveInputChipActionReturn =>
  createPrimitiveInputChipAction({
    type: InputChipActionTypes.SHOW_INPUT,
    // reducer ignores payload
    payload: false,
  });

export const hideInput = (): primitiveInputChipActionReturn =>
  createPrimitiveInputChipAction({
    type: InputChipActionTypes.HIDE_INPUT,
    // reducer ignores payload
    payload: false,
  });

export const submitValue = (
  submitCallback: SubmitCallback
): InputChipThunkAction<void> => (dispatch: InputChipDispatch): void => {
  submitCallback(store.getState().inputValue);
  dispatch(hideInput());
};

export const handleKeyboardInteraction = (
  event: KeyboardEvent<HTMLIonInputElement>,
  submitCallback: SubmitCallback
): InputChipThunkAction<void> => (dispatch: InputChipDispatch): void => {
  if (event.key === 'Enter' && store.getState().inputValue.length > 0) {
    dispatch(submitValue(submitCallback));
  } else if (event.key === 'Escape') {
    dispatch(hideInput());
    event.preventDefault();
    event.stopPropagation();
  }
};
