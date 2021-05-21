import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';

export interface SnowmanAppStateProps {
  resources: CentralResourcesModel;
}

export interface SnowmanAppDispatchProps {
  refreshCentralResources(): void;
}

export type SnowmanAppProps = SnowmanAppDispatchProps & SnowmanAppStateProps;
