import { DropResult } from 'react-beautiful-dnd';
import { ExperimentEntity } from 'types/ExperimentEntity';

export interface IntersectionSelectorStateProps {
  ignored: ExperimentEntity[];
  included: ExperimentEntity[];
  excluded: ExperimentEntity[];
}

export interface IntersectionSelectorDispatchProps {
  dragExperiment(dragResult: DropResult): void;
}

export type IntersectionSelectorProps = IntersectionSelectorDispatchProps &
  IntersectionSelectorStateProps;
