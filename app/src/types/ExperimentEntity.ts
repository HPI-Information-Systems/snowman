import { Experiment, ExperimentConfigItemSimilarity } from 'api';

export interface ExperimentEntity {
  experiment: Experiment;
  similarity?: ExperimentConfigItemSimilarity;
}
