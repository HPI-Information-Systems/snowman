import { SelectorGroupOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupProps';

export type SelectorPopoverGroupOwnProps = SelectorGroupOwnProps;

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
