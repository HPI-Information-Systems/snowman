import { Experiment } from 'api';
import { DropResult } from 'react-beautiful-dnd';

export interface IntersectionSelectorStateProps {
  ignored: Experiment[];
  included: Experiment[];
  excluded: Experiment[];
}

export interface IntersectionSelectorDispatchProps {
  dragExperiment(dragResult: DropResult): void;
}

export type IntersectionSelectorProps = IntersectionSelectorDispatchProps &
  IntersectionSelectorStateProps;
