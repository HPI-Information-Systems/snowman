import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { SnowmanAction } from 'types/SnowmanAction';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';

export const easyPrimitiveAction = <Model = SnowmanAppModel>(
  anAction: SnowmanAction
): SnowmanThunkAction<void, Model> => (
  dispatch: SnowmanDispatch<Model>
): SnowmanAction => dispatch(anAction);

export type easyPrimitiveActionReturn<
  Model = SnowmanAppModel
> = SnowmanThunkAction<void, Model>;

export const easyPrimitiveDumpAction = (): easyPrimitiveActionReturn =>
  easyPrimitiveAction({
    // reducer skip action
    type: '',
    // reducer ignores payload
    payload: false,
  });
