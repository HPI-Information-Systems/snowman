import { ExperimentIntersectionCount } from 'api';
import { IntersectionVennDiagramConfigStrategy } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/config';
import { ExperimentEntity } from 'types/ExperimentEntity';

export interface IntersectionVennDiagramOwnProps {
  strategy?: IntersectionVennDiagramConfigStrategy;
  onIntersect?: (experiments: ExperimentEntity[]) => void;
}

export interface IntersectionVennDiagramStateProps {
  experiments: ExperimentEntity[];
  included: ExperimentEntity[];
  counts: ExperimentIntersectionCount[];
  countsLoaded: boolean;
}

export interface IntersectionVennDiagramDispatchProps {
  intersect(experiments: ExperimentEntity[]): void;
}

export type IntersectionVennDiagramProps = IntersectionVennDiagramOwnProps &
  IntersectionVennDiagramStateProps &
  IntersectionVennDiagramDispatchProps;
