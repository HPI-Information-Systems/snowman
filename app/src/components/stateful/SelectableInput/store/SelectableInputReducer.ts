import { SelectableInputActionTypes } from 'components/stateful/SelectableInput/types/SelectableInputActionTypes';
import { SelectableInputModel } from 'components/stateful/SelectableInput/types/SelectableInputModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: SelectableInputModel = {
  searchString: '',
  eventPopover: undefined,
  shouldShowPopover: false,
};

export const SelectableInputReducer = (
  state: SelectableInputModel = initialState,
  action: SnowmanAction
): SelectableInputModel => {
  switch (action.type) {
    case SelectableInputActionTypes.RESET_COMPONENT:
      return initialState;
    case SelectableInputActionTypes.CHANGE_SEARCH_STRING:
      return { ...state, searchString: action.payload as string };
    case SelectableInputActionTypes.SHOW_POPOVER:
      return {
        ...state,
        shouldShowPopover: true,
        eventPopover: action.payload as Event,
      };
    case SelectableInputActionTypes.CLOSE_POPOVER:
      return {
        ...state,
        shouldShowPopover: false,
        eventPopover: undefined,
      };
    default:
      return state;
  }
};
