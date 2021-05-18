import {
  Algorithm,
  Dataset,
  Experiment,
  SimilarityThresholdFunction,
} from 'api';
import { CentralResourcesActionTypes } from 'apps/SnowmanApp/types/CentralResourcesActionTypes';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { sortBy } from 'lodash';
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
        algorithms: sortBy((action.payload as Algorithm[]).slice(), [
          (anAlgorithm) => anAlgorithm.id,
        ]),
      };
    case CentralResourcesActionTypes.STORE_DATASETS:
      return {
        ...state,
        datasets: sortBy((action.payload as Dataset[]).slice(), [
          (aDataset) => aDataset.id * -1,
        ]),
      };
    case CentralResourcesActionTypes.STORE_EXPERIMENTS:
      return {
        ...state,
        experiments: sortBy((action.payload as Experiment[]).slice(), [
          (anExperiment) => anExperiment.datasetId * -1,
          (anExperiment) => anExperiment.algorithmId * -1,
          (anExperiment) => anExperiment.id,
        ]),
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
