import { ThunkDispatch } from 'redux-thunk';
import { SnowmanAction } from 'types/SnowmanAction';

export type SnowmanDispatch<Model, Payload = unknown> = ThunkDispatch<
  Model,
  null,
  SnowmanAction<Payload>
>;
