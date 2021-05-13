import { Algorithm, Dataset, Experiment } from 'api';

export interface SnowmanAppStateProps {
  algorithms: Algorithm[];
  datasets: Dataset[];
  experiments: Experiment[];
}

export interface SnowmanAppDispatchProps {
  refreshCentralResources(): void;
}

export type SnowmanAppProps = SnowmanAppDispatchProps & SnowmanAppStateProps;
