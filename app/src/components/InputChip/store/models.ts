import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Store } from 'store/models';

export interface InputChipStore {
  inputValue: string;
  shouldShowInput: boolean;
}

export interface InputChipAction extends Action<InputChipActionTypes> {
  payload: string | boolean;
}

export type InputChipThunkAction<R> = ThunkAction<
  R,
  Store,
  null,
  InputChipAction
>;

export type InputChipDispatch = ThunkDispatch<Store, null, InputChipAction>;

export enum InputChipActionTypes {
  SHOW_INPUT,
  HIDE_INPUT,
  CHANGE_VALUE,
}
