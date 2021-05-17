import { ExperimentEntity } from 'types/ExperimentEntity';

export interface MetricEntity {
  experiment: ExperimentEntity;
  groundTruthId: number;
}

export interface MetricEntityOptional {
  experiment?: ExperimentEntity;
  groundTruthId: number;
}
