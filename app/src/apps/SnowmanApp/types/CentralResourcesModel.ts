import { Algorithm, Dataset, Experiment } from 'api';

export interface CentralResourcesModel {
  datasets: Dataset[];
  experiments: Experiment[];
  algorithms: Algorithm[];
}
