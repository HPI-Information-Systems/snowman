import {
  InputChipAction,
  InputChipDispatch,
  InputChipThunkAction,
} from 'components/InputChip/store/models';

export const createPrimitiveInputChipAction = (
  anAction: InputChipAction
): InputChipThunkAction<void> => (
  dispatch: InputChipDispatch
): InputChipAction => dispatch(anAction);

export type primitiveInputChipActionReturn = ReturnType<
  typeof createPrimitiveInputChipAction
>;
