export interface SelectorPopoverGroupOwnProps {
  items: { icon: string; title: string; indent?: number }[];
}

export interface SelectorPopoverGroupStateProps {
  isOpen: boolean;
}

export interface SelectorPopoverGroupDispatchProps {
  open(event: MouseEvent): void;
  close(): void;
}

export type SelectorPopoverGroupProps = SelectorPopoverGroupOwnProps &
  SelectorPopoverGroupStateProps &
  SelectorPopoverGroupDispatchProps;
