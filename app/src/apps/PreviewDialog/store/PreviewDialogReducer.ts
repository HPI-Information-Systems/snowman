import { Dataset, Experiment } from 'api';
import { PreviewDialogActionTypes } from 'apps/PreviewDialog/types/PreviewDialogActionTypes';
import { PreviewDialogModel } from 'apps/PreviewDialog/types/PreviewDialogModel';
import { PreviewDialogTypes } from 'apps/PreviewDialog/types/PreviewDialogTypes';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: PreviewDialogModel = {
  type: undefined,
  dataset: undefined,
  experiment: undefined,
};

const PreviewDialogReducer = (
  state: PreviewDialogModel = initialState,
  action: SnowmanAction
): PreviewDialogModel => {
  switch (action.type) {
    case PreviewDialogActionTypes.SET_DATASET:
      return {
        ...state,
        experiment: undefined,
        type: PreviewDialogTypes.DATASET,
        dataset: action.payload as Dataset,
      };
    case PreviewDialogActionTypes.SET_EXPERIMENT:
      return {
        ...state,
        dataset: undefined,
        type: PreviewDialogTypes.EXPERIMENT,
        experiment: action.payload as Experiment,
      };
    default:
      return state;
  }
};

export default PreviewDialogReducer;
