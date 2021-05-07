import { SelectorItem } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/SelectorGroup/SelectorGroupProps';
import { GenericStoreComponentProps } from 'utils/GenericStoreComponentFactory';

export interface SelectorPopoverGroupOwnProps
  extends GenericStoreComponentProps {
  children?: JSX.Element | JSX.Element[];
  items: SelectorItem[];
}

export interface SelectorPopoverGroupStateProps {
  isOpen: boolean;
  eventPopover: Event | undefined;
}

export interface SelectorPopoverGroupDispatchProps {
  show(event: Event): void;
  close(): void;
}

export type SelectorPopoverGroupProps = SelectorPopoverGroupOwnProps &
  SelectorPopoverGroupStateProps &
  SelectorPopoverGroupDispatchProps;
