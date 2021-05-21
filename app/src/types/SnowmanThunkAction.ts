import { ThunkAction } from 'redux-thunk';
import { SnowmanAction } from 'types/SnowmanAction';

export type SnowmanThunkAction<Return, Model, Payload = unknown> = ThunkAction<
  Return,
  Model,
  null,
  SnowmanAction<Payload>
>;
