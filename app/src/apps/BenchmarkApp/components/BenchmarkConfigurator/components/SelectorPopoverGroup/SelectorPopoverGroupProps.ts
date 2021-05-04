import { GenericStoreComponentProps } from 'components/generics/GenericStoreComponent/GenericStoreComponentProps';

export interface SelectorPopoverGroupOwnProps
  extends GenericStoreComponentProps {
  children?: JSX.Element | JSX.Element[];
  items: { icon: string; title: string; indent?: number }[];
}

export interface SelectorPopoverGroupStateProps {
  isOpen: boolean;
  event: Event | undefined;
}

export interface SelectorPopoverGroupDispatchProps {
  open(event: Event): void;
  close(): void;
}

export type SelectorPopoverGroupProps = SelectorPopoverGroupOwnProps &
  SelectorPopoverGroupStateProps &
  SelectorPopoverGroupDispatchProps;
