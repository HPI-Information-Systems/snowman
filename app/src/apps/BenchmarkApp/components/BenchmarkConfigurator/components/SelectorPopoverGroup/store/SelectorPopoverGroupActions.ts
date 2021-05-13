import { SelectorPopoverGroupActionsTypes } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/types/SelectorPopoverGroupActionsTypes';
import { SelectorPopoverGroupModel } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorPopoverGroup/types/SelectorPopoverGroupModel';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const showPopover = (
  anEvent: Event
): easyPrimitiveActionReturn<SelectorPopoverGroupModel> =>
  easyPrimitiveAction<SelectorPopoverGroupModel>({
    type: SelectorPopoverGroupActionsTypes.SHOW_POPOVER,
    payload: anEvent,
  });

export const closePopover = (): easyPrimitiveActionReturn<SelectorPopoverGroupModel> =>
  easyPrimitiveAction<SelectorPopoverGroupModel>({
    type: SelectorPopoverGroupActionsTypes.CLOSE_POPOVER,
    // reducer ignores payload
    payload: false,
  });
