import {
  deleteAlgorithm,
  refreshCentralResources,
} from 'apps/SnowmanApp/store/CentralResourcesActions';
import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';

export const doRefreshCentralResources = (): Promise<void> =>
  SnowmanAppDispatch(refreshCentralResources());

export const doDeleteAlgorithm = (id: number): Promise<void> =>
  SnowmanAppDispatch(deleteAlgorithm(id));
