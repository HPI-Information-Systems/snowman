import {
  Algorithm,
  Dataset,
  Experiment,
  SimilarityThresholdFunction,
} from 'api';

export interface CentralResourcesModel {
  algorithms: Algorithm[];
  algorithmsMap: Record<number, Algorithm>;
  datasets: Dataset[];
  datasetsMap: Record<number, Dataset>;
  experiments: Experiment[];
  experimentsMap: Record<number, Experiment>;
  simFunctions: SimilarityThresholdFunction[];
  simFunctionsMap: Record<number, SimilarityThresholdFunction>;
}
