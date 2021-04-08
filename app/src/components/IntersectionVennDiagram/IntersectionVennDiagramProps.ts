import { Experiment, ExperimentIntersectionPairCountsItem } from 'api';
import { IntersectionVennDiagramConfigStrategy } from 'components/IntersectionVennDiagram/config';

export interface IntersectionVennDiagramOwnProps {
  strategy?: IntersectionVennDiagramConfigStrategy;
  onIntersect?: (experiments: Experiment[]) => void;
}

export interface IntersectionVennDiagramStateProps {
  experiments: Experiment[];
  included: Experiment[];
  counts: ExperimentIntersectionPairCountsItem[];
  countsLoaded: boolean;
}

export interface IntersectionVennDiagramDispatchProps {
  intersect(experiments: Experiment[]): void;
}

export type IntersectionVennDiagramProps = IntersectionVennDiagramOwnProps &
  IntersectionVennDiagramStateProps &
  IntersectionVennDiagramDispatchProps;
