import { SelectableInputStoreActionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { SelectableInputStore } from 'store/models';

const initialState: SelectableInputStore = {
  searchString: '',
  eventPopover: undefined,
  shouldShowPopover: false,
};

export const SelectableInputReducer = (
  state: SelectableInputStore = initialState,
  action: SnowmanAction
): SelectableInputStore => {
  switch (action.type) {
    case SelectableInputStoreActionTypes.RESET_COMPONENT:
      return initialState;
    case SelectableInputStoreActionTypes.CHANGE_SEARCH_STRING:
      return { ...state, searchString: action.payload as string };
    case SelectableInputStoreActionTypes.SHOW_POPOVER:
      return {
        ...state,
        shouldShowPopover: true,
        eventPopover: action.payload as Event,
      };
    case SelectableInputStoreActionTypes.CLOSE_POPOVER:
      return {
        ...state,
        shouldShowPopover: false,
        eventPopover: undefined,
      };
    default:
      return state;
  }
};