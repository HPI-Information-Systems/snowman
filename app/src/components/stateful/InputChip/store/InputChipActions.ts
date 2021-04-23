import { SubmitCallback } from 'components/stateful/InputChip/InputChipProps';
import { InputChipActionTypes } from 'components/stateful/InputChip/types/InputChipActionTypes';
import { InputChipModel } from 'components/stateful/InputChip/types/InputChipModel';
import { KeyboardEvent } from 'react';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const changeInputValue = (
  newInputValue: string
): easyPrimitiveActionReturn<InputChipModel> =>
  easyPrimitiveAction<InputChipModel>({
    type: InputChipActionTypes.CHANGE_VALUE,
    payload: newInputValue,
  });

export const showInput = (): easyPrimitiveActionReturn<InputChipModel> =>
  easyPrimitiveAction<InputChipModel>({
    type: InputChipActionTypes.SHOW_INPUT,
    // reducer ignores payload
    payload: false,
  });

export const hideInput = (): easyPrimitiveActionReturn<InputChipModel> =>
  easyPrimitiveAction<InputChipModel>({
    type: InputChipActionTypes.HIDE_INPUT,
    // reducer ignores payload
    payload: false,
  });

export const resetInput = (): easyPrimitiveActionReturn<InputChipModel> =>
  easyPrimitiveAction<InputChipModel>({
    type: InputChipActionTypes.RESET_INPUT,
    // reducer ignores payload
    payload: false,
  });

export const submitValue = (
  submitCallback: SubmitCallback
): SnowmanThunkAction<void, InputChipModel> => (
  dispatch: SnowmanDispatch<InputChipModel>,
  getState: () => InputChipModel
): void => {
  submitCallback(getState().inputValue);
  dispatch(resetInput());
};

export const handleKeyboardInteraction = (
  event: KeyboardEvent<HTMLIonInputElement>,
  submitCallback: SubmitCallback
): SnowmanThunkAction<void, InputChipModel> => (
  dispatch: SnowmanDispatch<InputChipModel>,
  getState: () => InputChipModel
): void => {
  if (event.key === 'Enter' && getState().inputValue.length > 0) {
    dispatch(submitValue(submitCallback));
  } else if (event.key === 'Escape') {
    dispatch(hideInput());
    event.preventDefault();
    event.stopPropagation();
  }
};
