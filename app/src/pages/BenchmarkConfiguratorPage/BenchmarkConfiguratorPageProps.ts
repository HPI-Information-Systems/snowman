import { Experiment } from 'api';
import { IonReorderEvent } from 'types/IonReorderEvent';

export interface BenchmarkConfiguratorPageStateProps {
  experiments: Experiment[];
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
