import {
  InputChipAction,
  InputChipActionTypes,
  InputChipStore,
} from 'components/InputChip/store/models';

const initialState: InputChipStore = {
  shouldShowInput: false,
  inputValue: '',
};

const InputChipReducer = (
  state: InputChipStore = initialState,
  action: InputChipAction
): InputChipStore => {
  console.log(action);
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
