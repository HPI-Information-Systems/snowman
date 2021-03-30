import {
  SnowmanAction,
  SnowmanDispatch,
  SnowmanThunkAction,
} from 'store/messages';

export const easyPrimitiveAction = (
  anAction: SnowmanAction
): SnowmanThunkAction<void> => (dispatch: SnowmanDispatch): SnowmanAction =>
  dispatch(anAction);

export type easyPrimitiveActionReturn = ReturnType<typeof easyPrimitiveAction>;

export const easyPrimitiveDumpAction = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    // reducer skip action
    type: '',
    // reducer ignores payload
    payload: false,
  });
