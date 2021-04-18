import {
  SnowmanAction,
  SnowmanGenericDispatch,
  SnowmanGenericThunkAction,
  SnowmanThunkAction,
} from 'store/messages';
import { Store } from 'store/models';

export const easyPrimitiveAction = <Model = Store>(
  anAction: SnowmanAction
): SnowmanGenericThunkAction<void, Model> => (
  dispatch: SnowmanGenericDispatch<Model>
): SnowmanAction => dispatch(anAction);

export type easyPrimitiveActionReturn<
  Model = Store
> = SnowmanGenericThunkAction<void, Model>;

export const easyPrimitiveDumpAction = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    // reducer skip action
    type: '',
    // reducer ignores payload
    payload: false,
  });
