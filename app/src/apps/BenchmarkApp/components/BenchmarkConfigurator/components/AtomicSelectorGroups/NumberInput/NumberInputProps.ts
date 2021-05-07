import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface NumberInputOwnProps {
  cacheKey: StoreCacheKey;
  title?: string;
}

export interface NumberInputStateProps {
  value: number | undefined;
}

export interface NumberInputDispatchProps {
  setValue: (anEvent: IonChangeEvent) => void;
}

export type NumberInputProps = NumberInputOwnProps &
  NumberInputStateProps &
  NumberInputDispatchProps;
