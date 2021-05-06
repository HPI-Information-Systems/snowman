import { StoreCacheKey } from 'apps/BenchmarkApp/types/StoreCacheKey';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface NumberInputGroupOwnProps {
  cacheKey: StoreCacheKey;
  title?: string;
}

export interface NumberInputGroupStateProps {
  value: number | undefined;
}

export interface NumberInputGroupDispatchProps {
  setValue: (anEvent: IonChangeEvent) => void;
}

export type NumberInputGroupProps = NumberInputGroupOwnProps &
  NumberInputGroupStateProps &
  NumberInputGroupDispatchProps;
