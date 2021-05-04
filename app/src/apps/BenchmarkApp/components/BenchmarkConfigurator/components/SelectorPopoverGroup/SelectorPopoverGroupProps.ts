export interface SelectorPopoverGroupOwnProps {
  instanceDescriptor?: string;
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
