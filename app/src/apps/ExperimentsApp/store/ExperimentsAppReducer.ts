import { Algorithm, Dataset } from 'api';
import { ExperimentsAppActionTypes } from 'apps/ExperimentsApp/types/ExperimentsAppActionTypes';
import { ExperimentsAppModel } from 'apps/ExperimentsApp/types/ExperimentsAppModel';
import { CentralResourcesGenericActionsTypes } from 'apps/SnowmanApp/types/CentralResourcesGenericActionsTypes';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { intersection } from 'lodash';
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
    case CentralResourcesGenericActionsTypes.REFRESHED: {
      const centralResources = action.payload as CentralResourcesModel;
      return {
        ...state,
        selectedDatasets: intersection(
          state.selectedDatasets,
          centralResources.datasets.map((aDataset: Dataset): string =>
            aDataset.id.toString()
          )
        ),
        selectedAlgorithms: intersection(
          state.selectedAlgorithms,
          centralResources.algorithms.map((anAlgorithm: Algorithm): string =>
            anAlgorithm.id.toString()
          )
        ),
      };
    }
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
