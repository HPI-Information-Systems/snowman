import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const setResources = (
  resources: CentralResourcesModel
): easyPrimitiveActionReturn<BenchmarkAppModel> =>
  easyPrimitiveAction({
    type: BenchmarkAppActionsTypes.SET_RESOURCES,
    payload: resources,
  });
