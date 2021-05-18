import {
  Algorithm,
  Dataset,
  Experiment,
  SimilarityThresholdFunction,
} from 'api';
import { CentralResourcesActionTypes } from 'apps/SnowmanApp/types/CentralResourcesActionTypes';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: CentralResourcesModel = {
  algorithms: [],
  datasets: [],
  experiments: [],
  simFunctions: [],
};

const CentralResourcesReducer = (
  state: CentralResourcesModel = initialState,
  action: SnowmanAction
): CentralResourcesModel => {
  switch (action.type) {
    case CentralResourcesActionTypes.STORE_ALGORITHMS:
      return {
        ...state,
        algorithms: action.payload as Algorithm[],
      };
    case CentralResourcesActionTypes.STORE_DATASETS:
      return {
        ...state,
        datasets: action.payload as Dataset[],
      };
    case CentralResourcesActionTypes.STORE_EXPERIMENTS:
      return {
        ...state,
        experiments: action.payload as Experiment[],
      };
    case CentralResourcesActionTypes.STORE_SIMFUNCTIONS:
      return {
        ...state,
        simFunctions: action.payload as SimilarityThresholdFunction[],
      };
    default:
      return state;
  }
};

export default CentralResourcesReducer;
