import { IonReorderEvent } from 'types/IonReorderEvent';

export interface BenchmarkConfiguratorPageStateProps {
  experimentResolution: Map<number, string>;
  availableExperiments: number[];
  selectedGoldstandards: number[];
  selectedExperiments: number[];
}

export interface BenchmarkConfiguratorPageDispatchProps {
  handleReorder(event: IonReorderEvent): void;
  resetReorder(): void;
}

export type BenchmarkConfiguratorPageProps = BenchmarkConfiguratorPageStateProps &
  BenchmarkConfiguratorPageDispatchProps;
