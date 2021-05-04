import { SelectorPopoverGroupActionsTypes } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/types/SelectorPopoverGroupActionsTypes';
import { SelectorPopoverGroupModel } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/types/SelectorPopoverGroupModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: SelectorPopoverGroupModel = {
  isOpen: false,
  eventPopover: undefined,
};

const SelectorPopoverGroupReducer = (
  state: SelectorPopoverGroupModel = initialState,
  action: SnowmanAction
): SelectorPopoverGroupModel => {
  switch (action.type) {
    case SelectorPopoverGroupActionsTypes.SHOW_POPOVER:
      return {
        ...state,
        isOpen: true,
        eventPopover: action.payload as Event,
      };
    case SelectorPopoverGroupActionsTypes.CLOSE_POPOVER:
      return {
        ...state,
        isOpen: false,
        eventPopover: undefined,
      };
    default:
      return state;
  }
};

export default SelectorPopoverGroupReducer;
