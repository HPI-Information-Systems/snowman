import { Algorithm, Experiment } from 'api';
import { ExpansionTypes } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/ExpansionTypes';

export interface DecisionSegmentEntity<Type> {
  title: string;
  children: DecisionEntities<Type>[];
}

export interface DecisionEntities<Type> {
  title: string;
  selector?: (anEntity: Type) => string;
  doesExpand?: ExpansionTypes;
  expandedBy?: ExpansionTypes;
  inset?: boolean;
}

export type DecisionRowAlgorithm = DecisionEntities<Algorithm>;
export type DecisionRowExperiment = DecisionEntities<Experiment>;
