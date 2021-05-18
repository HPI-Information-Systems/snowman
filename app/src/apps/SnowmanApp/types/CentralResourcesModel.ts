import {
  Algorithm,
  Dataset,
  Experiment,
  SimilarityThresholdFunction,
} from 'api';

export interface CentralResourcesModel {
  datasets: Dataset[];
  experiments: Experiment[];
  algorithms: Algorithm[];
  simFunctions: SimilarityThresholdFunction[];
}
