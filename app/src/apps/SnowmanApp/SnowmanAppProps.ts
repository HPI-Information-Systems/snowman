import { Algorithm } from 'api';

export interface SnowmanAppStateProps {
  algorithms: Algorithm[];
}

export interface SnowmanAppDispatchProps {
  refreshCentralResources(): void;
}

export type SnowmanAppProps = SnowmanAppDispatchProps & SnowmanAppStateProps;
