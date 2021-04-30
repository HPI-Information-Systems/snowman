import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ImmediateStore } from 'store/models';
import { SnowmanAction } from 'types/SnowmanAction';

export type SnowmanThunkAction<R> = ThunkAction<
  R,
  ImmediateStore,
  null,
  SnowmanAction
>;

export type SnowmanDispatch = ThunkDispatch<
  ImmediateStore,
  null,
  SnowmanAction
>;
