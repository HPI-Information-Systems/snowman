import { KeyboardEvent } from 'react';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface SubmitCallback {
  (value: string): void;
}

export interface InputChipOwnProps {
  instanceDescriptor?: string;
  placeholder?: string;
  label?: string;
  submitValueCallback: SubmitCallback;
}

export interface InputChipStateProps {
  value: string;
  shouldShowInput: boolean;
}

export interface InputChipDispatchProps {
  onChangeValue(event: IonChangeEvent): void;
  showInput(): void;
  hideInput(): void;
  submitInput(): void;
  handleKeyboardInteraction(event: KeyboardEvent<HTMLIonInputElement>): void;
}

export type InputChipProps = InputChipStateProps &
  InputChipDispatchProps &
  InputChipOwnProps;
