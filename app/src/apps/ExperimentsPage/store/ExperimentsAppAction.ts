import { ExperimentsAppActionTypes } from 'apps/ExperimentsPage/types/ExperimentsAppActionTypes';
import { ExperimentsAppModel } from 'apps/ExperimentsPage/types/ExperimentsAppModel';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';

export const changeSelectedDatasets = (
  datasetIds: string[]
): easyPrimitiveActionReturn<ExperimentsAppModel> =>
  easyPrimitiveAction<ExperimentsAppModel>({
    type: ExperimentsAppActionTypes.CHANGE_SELECTED_DATASETS,
    payload: datasetIds,
  });

export const changeSelectedAlgorithms = (
  algorithmIds: string[]
): easyPrimitiveActionReturn<ExperimentsAppModel> =>
  easyPrimitiveAction<ExperimentsAppModel>({
    type: ExperimentsAppActionTypes.CHANGE_SELECTED_ALGORITHMS,
    payload: algorithmIds,
  });
