import { ExperimentsAppActionTypes } from 'apps/ExperimentsPage/types/ExperimentsAppActionTypes';
import { ExperimentsAppModel } from 'apps/ExperimentsPage/types/ExperimentsAppModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: ExperimentsAppModel = {
  selectedAlgorithms: [],
  selectedDatasets: [],
};

const ExperimentsAppReducer = (
  state: ExperimentsAppModel = initialState,
  action: SnowmanAction
): ExperimentsAppModel => {
  switch (action.type) {
    case ExperimentsAppActionTypes.CHANGE_SELECTED_DATASETS:
      return {
        ...state,
        selectedDatasets: action.payload as string[],
      };
    case ExperimentsAppActionTypes.CHANGE_SELECTED_ALGORITHMS:
      return {
        ...state,
        selectedAlgorithms: action.payload as string[],
      };
    default:
      return state;
  }
};

export default ExperimentsAppReducer;
