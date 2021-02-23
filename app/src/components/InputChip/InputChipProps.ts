import { IonChangeEvent } from 'types/IonChangeEvent';

export interface InputChipOwnProps {
  placeholder?: string;
  label?: string;
  addNewTag(newChipValue: string): void;
}

export interface InputChipStateProps {
  value: string;
  shouldShowInput: boolean;
}

export interface InputChipDispatchProps {
  onChangeValue(event: IonChangeEvent): void;
  onSubmit(): void;
  showInput(): void;
  hideInput(): void;
}

export type InputChipProps = InputChipStateProps &
  InputChipDispatchProps &
  InputChipOwnProps;
