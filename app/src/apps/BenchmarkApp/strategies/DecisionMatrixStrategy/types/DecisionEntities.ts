import { Algorithm, Experiment } from 'api';

export interface DecisionSegmentEntity<Type> {
  title: string;
  children: DecisionEntities<Type>[];
}

export interface DecisionEntities<Type> {
  title: string;
  selector?: (anEntity: Type) => string;
  inset?: boolean;
}

export type DecisionRowAlgorithm = DecisionEntities<Algorithm>;
export type DecisionRowExperiment = DecisionEntities<Experiment>;
