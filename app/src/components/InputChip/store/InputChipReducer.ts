import { InputChipActionTypes } from 'components/InputChip/types/InputChipActionTypes';
import { InputChipModel } from 'components/InputChip/types/InputChipModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: InputChipModel = {
  shouldShowInput: false,
  inputValue: '',
};

const InputChipReducer = (
  state: InputChipModel = initialState,
  action: SnowmanAction
): InputChipModel => {
  switch (action.type) {
    case InputChipActionTypes.HIDE_INPUT:
      return {
        ...state,
        shouldShowInput: false,
      };
    case InputChipActionTypes.SHOW_INPUT:
      return {
        ...state,
        shouldShowInput: true,
      };
    case InputChipActionTypes.CHANGE_VALUE:
      return {
        ...state,
        inputValue: action.payload as string,
      };
    default:
      return state;
  }
};

export default InputChipReducer;
