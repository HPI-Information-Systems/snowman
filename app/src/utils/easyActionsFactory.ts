import { Store } from 'store/models';
import { SnowmanAction } from 'types/SnowmanAction';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export const easyPrimitiveAction = <Model = Store>(
  anAction: SnowmanAction
): SnowmanThunkAction<void, Model> => (
  dispatch: SnowmanDispatch<Model>
): SnowmanAction => dispatch(anAction);

export type easyPrimitiveActionReturn<Model = Store> = SnowmanThunkAction<
  void,
  Model
>;

export const easyPrimitiveDumpAction = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    // reducer skip action
    type: '',
    // reducer ignores payload
    payload: false,
  });
