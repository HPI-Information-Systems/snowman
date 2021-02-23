import { InputChipStoreActionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { InputChipStore } from 'store/models';

const initialValues: InputChipStore = {
  newChipValue: '',
  shouldShowInput: false,
};

export const InputChipReducer = (
  state: InputChipStore = initialValues,
  action: SnowmanAction
): InputChipStore => {
  switch (action.type) {
    case InputChipStoreActionTypes.CHANGE_INPUT_VALUE:
      return {
        ...state,
        newChipValue: action.payload as string,
      };
    case InputChipStoreActionTypes.SHOW_INPUT:
      return {
        ...state,
        shouldShowInput: true,
      };
    case InputChipStoreActionTypes.HIDE_INPUT:
      return {
        ...state,
        shouldShowInput: false,
        newChipValue: '',
      };
    default:
      return state;
  }
};
