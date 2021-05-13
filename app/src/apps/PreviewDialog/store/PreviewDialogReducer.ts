import { Dataset, Experiment, SimilarityThresholdFunction } from 'api';
import { PreviewDialogActionTypes } from 'apps/PreviewDialog/types/PreviewDialogActionTypes';
import { PreviewDialogModel } from 'apps/PreviewDialog/types/PreviewDialogModel';
import { PreviewDialogTypes } from 'apps/PreviewDialog/types/PreviewDialogTypes';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: PreviewDialogModel = {
  type: undefined,
  dataset: undefined,
  experiment: undefined,
  similarityFunction: undefined,
};

const PreviewDialogReducer = (
  state: PreviewDialogModel = initialState,
  action: SnowmanAction
): PreviewDialogModel => {
  switch (action.type) {
    case PreviewDialogActionTypes.SET_DATASET:
      return {
        ...initialState,
        type: PreviewDialogTypes.DATASET,
        dataset: action.payload as Dataset,
      };
    case PreviewDialogActionTypes.SET_EXPERIMENT:
      return {
        ...initialState,
        type: PreviewDialogTypes.EXPERIMENT,
        experiment: action.payload as Experiment,
      };
    case PreviewDialogActionTypes.SET_SIM_FUNCTION:
      return {
        ...initialState,
        type: PreviewDialogTypes.SIM_FUNCTION,
        similarityFunction: action.payload as SimilarityThresholdFunction,
      };
    case PreviewDialogActionTypes.SET_NONE:
      return initialState;
    default:
      return state;
  }
};

export default PreviewDialogReducer;
