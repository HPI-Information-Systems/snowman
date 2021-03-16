import { Experiment } from 'api';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';

export interface ExperimentsPageStateProps {
  matchingSolutions: string[];
  selectedMatchingSolutions: string[];
  availableExperiments: Experiment[];
  chosenExperiments: Experiment[];
  chosenGoldstandards: Experiment[];
}

export interface ExperimentsPageDispatchProps {
  clickOnTag(aTag: string): void;
  loadExperiments(): void;
  dragExperiment(eventDescriptor: DragNDropDescriptor): void;
  deleteExperiment(anExperimentId: number): void;
  editExperiment(anExperimentId: number): void;
}

export type ExperimentsPageProps = ExperimentsPageDispatchProps &
  ExperimentsPageStateProps;
