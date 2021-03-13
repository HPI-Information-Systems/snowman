import { IonReorderEvent } from 'types/IonReorderEvent';

export interface BenchmarkConfiguratorPageStateProps {
  experimentResolution: Map<number, string>;
  availableExperiments: number[];
  selectedGoldstandards: number[];
  selectedExperiments: number[];
  couldEnterBinaryMetricsPage: boolean;
}

export interface BenchmarkConfiguratorPageDispatchProps {
  handleReorder(event: IonReorderEvent): void;
  resetReorder(): void;
  enterBinaryMetricsPage(): void;
}

export type BenchmarkConfiguratorPageProps = BenchmarkConfiguratorPageStateProps &
  BenchmarkConfiguratorPageDispatchProps;
