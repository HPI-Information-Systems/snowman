import { IonChangeEvent } from 'types/IonChangeEvent';
import { GenericStoreComponentProps } from 'utils/GenericStoreComponentFactory';

export interface SelectableInputOwnProps<Content>
  extends GenericStoreComponentProps {
  selection: string[];
  allOptions: Content[];
  allowMultiselect: boolean;
  onChange(newSelection: string[]): void;
  getID?: (content: Content) => string;
  renderChild?: (content: Content) => JSX.Element;
  matches?: (content: Content, search: string) => boolean;
  children?: JSX.Element | JSX.Element[];
  emptyIcon?: string;
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

export type SelectableInputProps<
  Content = unknown
> = SelectableInputStateProps &
  SelectableInputDispatchProps &
  SelectableInputOwnProps<Content>;
