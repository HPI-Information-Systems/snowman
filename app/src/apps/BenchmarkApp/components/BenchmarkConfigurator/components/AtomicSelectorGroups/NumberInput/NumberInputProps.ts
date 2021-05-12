import { AtomicSelectorGroupOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import { IonChangeEvent } from 'types/IonChangeEvent';

export type NumberInputOwnProps = AtomicSelectorGroupOwnProps;

export interface NumberInputStateProps {
  value: number | undefined;
}

export interface NumberInputDispatchProps {
  setValue: (anEvent: IonChangeEvent) => void;
}

export type NumberInputProps = NumberInputOwnProps &
  NumberInputStateProps &
  NumberInputDispatchProps;
