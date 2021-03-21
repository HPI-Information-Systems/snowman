import { Algorithm } from 'api';
import { DropResult } from 'react-beautiful-dnd';

export interface ExperimentsPageStateProps {
  matchingSolutions: Algorithm[];
  selectedMatchingSolutions: Algorithm[];
}

export interface ExperimentsPageDispatchProps {
  loadExperiments(): void;
  clickOnMatchingSolution(aMatchingSolution: Algorithm): void;
  dragExperiment(dragResult: DropResult): void;
}

export type ExperimentsPageProps = ExperimentsPageDispatchProps &
  ExperimentsPageStateProps;
