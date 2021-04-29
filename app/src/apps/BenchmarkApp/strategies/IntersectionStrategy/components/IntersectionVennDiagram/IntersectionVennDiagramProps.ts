import { Experiment, ExperimentIntersectionCount } from 'api';
import { IntersectionVennDiagramConfigStrategy } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/config';

export interface IntersectionVennDiagramOwnProps {
  strategy?: IntersectionVennDiagramConfigStrategy;
  onIntersect?: (experiments: Experiment[]) => void;
}

export interface IntersectionVennDiagramStateProps {
  experiments: Experiment[];
  included: Experiment[];
  counts: ExperimentIntersectionCount[];
  countsLoaded: boolean;
}

export interface IntersectionVennDiagramDispatchProps {
  intersect(experiments: Experiment[]): void;
}

export type IntersectionVennDiagramProps = IntersectionVennDiagramOwnProps &
  IntersectionVennDiagramStateProps &
  IntersectionVennDiagramDispatchProps;
