import { Experiment, SimilarityThresholdFunction } from 'api';

export interface ExperimentEntity {
  experiment: Experiment;
  similarity?: {
    func: SimilarityThresholdFunction;
    threshold: number;
  };
}
