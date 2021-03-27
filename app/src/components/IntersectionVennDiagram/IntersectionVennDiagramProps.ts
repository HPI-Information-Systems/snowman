import { Experiment, ExperimentIntersectionPairCountsItem } from 'api';

export interface IntersectionVennDiagramStateProps {
  ignored: Experiment[];
  included: Experiment[];
  excluded: Experiment[];
  counts: ExperimentIntersectionPairCountsItem[];
}

export interface IntersectionVennDiagramDispatchProps {
  intersect(experiments: Experiment[]): void;
}

export type IntersectionVennDiagramProps = IntersectionVennDiagramStateProps &
  IntersectionVennDiagramDispatchProps;
