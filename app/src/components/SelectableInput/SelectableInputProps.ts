import { IonChangeEvent } from 'types/IonChangeEvent';

export interface SelectableInputOwnProps {
  instanceDescriptor?: string;
  currentOption: string;
  setOption(anOption: string): void;
  allOptions: string[];
}

export interface SelectableInputStateProps {
  shouldShowPopover: boolean;
  eventPopover: Event | undefined;
  searchString: string;
}

export interface SelectableInputDispatchProps {
  showPopover(anEvent: Event): void;
  closePopover(): void;
  changeSearchString(anEvent: IonChangeEvent): void;
  resetElement(): void;
}

export type SelectableInputProps = SelectableInputStateProps &
  SelectableInputDispatchProps &
  SelectableInputOwnProps;
