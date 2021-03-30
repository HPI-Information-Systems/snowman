import {
  InputChipAction,
  InputChipDispatch,
  InputChipThunkAction,
} from 'components/InputChip/store/models';

export const easyPrimitiveAction = (
  anAction: InputChipAction
): InputChipThunkAction<void> => (
  dispatch: InputChipDispatch
): InputChipAction => dispatch(anAction);

export type easyPrimitiveActionReturn = ReturnType<typeof easyPrimitiveAction>;
