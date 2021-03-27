import { Algorithm } from 'api';
import { DropResult } from 'react-beautiful-dnd';

export interface ExperimentsPageStateProps {
  matchingSolutions: Algorithm[];
  selectedMatchingSolutions: Algorithm[];
  showExperimentFilters: boolean;
}

export interface ExperimentsPageDispatchProps {
  loadExperiments(): void;
  clickOnMatchingSolution(aMatchingSolution: Algorithm): void;
  dragExperiment(dragResult: DropResult): void;
  resetIntersection(): void;
  clickOnExperimentFilterTool(): void;
}

export type ExperimentsPageProps = ExperimentsPageDispatchProps &
  ExperimentsPageStateProps;
