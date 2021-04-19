import { Algorithm, Dataset } from 'api';

export interface SnowmanAppStateProps {
  algorithms: Algorithm[];
  datasets: Dataset[];
}

export interface SnowmanAppDispatchProps {
  refreshCentralResources(): void;
}

export type SnowmanAppProps = SnowmanAppDispatchProps & SnowmanAppStateProps;
