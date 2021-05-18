import {
  deleteAlgorithm,
  deleteDataset,
  deleteExperiment,
  deleteSimFunction,
  refreshCentralResources,
} from 'apps/SnowmanApp/store/CentralResourcesActions';
import { SnowmanAppDispatch } from 'apps/SnowmanApp/store/SnowmanAppStore';

export const doRefreshCentralResources = (): Promise<void> =>
  SnowmanAppDispatch(refreshCentralResources());

export const doDeleteAlgorithm = (id: number): Promise<void> =>
  SnowmanAppDispatch(deleteAlgorithm(id));

export const doDeleteDataset = (id: number): Promise<void> =>
  SnowmanAppDispatch(deleteDataset(id));

export const doDeleteExperiment = (id: number): Promise<void> =>
  SnowmanAppDispatch(deleteExperiment(id));

export const doDeleteSimFunction = (id: number): Promise<void> =>
  SnowmanAppDispatch(deleteSimFunction(id));
