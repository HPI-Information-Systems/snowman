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

export const initialResourcesState: CentralResourcesModel = {
  algorithms: [],
  algorithmsMap: {},
  datasets: [],
  datasetsMap: {},
  experiments: [],
  experimentsMap: {},
  simFunctions: [],
  simFunctionsMap: {},
};

const constructEntityMap = <Entity extends { id: number }>(
  entities: Entity[]
): Record<number, Entity> =>
  Object.fromEntries(entities.map((entity) => [entity.id, entity]));

const CentralResourcesReducer = (
  state: CentralResourcesModel = initialResourcesState,
  action: SnowmanAction
): CentralResourcesModel => {
  switch (action.type) {
    case CentralResourcesActionTypes.STORE_ALGORITHMS: {
      const algorithms = sortBy(
        (action.payload as Algorithm[]).slice(),
        (anAlgorithm) => anAlgorithm.id
      );
      return {
        ...state,
        algorithms,
        algorithmsMap: constructEntityMap(algorithms),
      };
    }
    case CentralResourcesActionTypes.STORE_DATASETS: {
      const datasets = sortBy((action.payload as Dataset[]).slice(), [
        (aDataset) => aDataset.id * -1,
      ]);
      return {
        ...state,
        datasets,
        datasetsMap: constructEntityMap(datasets),
      };
    }
    case CentralResourcesActionTypes.STORE_EXPERIMENTS: {
      const experiments = sortBy(
        (action.payload as Experiment[]).slice(),
        (anExperiment) => anExperiment.datasetId * -1,
        (anExperiment) => anExperiment.algorithmId * -1,
        (anExperiment) => anExperiment.id
      );
      return {
        ...state,
        experiments,
        experimentsMap: constructEntityMap(experiments),
      };
    }
    case CentralResourcesActionTypes.STORE_SIMFUNCTIONS: {
      const simFunctions = action.payload as SimilarityThresholdFunction[];
      return {
        ...state,
        simFunctions,
        simFunctionsMap: constructEntityMap(simFunctions),
      };
    }
    default:
      return state;
  }
};

export default CentralResourcesReducer;
