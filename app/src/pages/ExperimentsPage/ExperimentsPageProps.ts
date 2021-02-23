import { Option } from 'types/Option';

export interface ExperimentsPageStateProps {
  matchingSolutions: string[];
  selectedMatchingSolutions: string[];
  experiments: Option[];
  selectedExperiments: number[];
}

export interface ExperimentsPageDispatchProps {
  clickOnTag(aTag: string): void;
  clickOnExperiment(anExperimentId: number): void;
  loadExperiments(): void;
  deleteExperiment(anExperimentId: number): void;
}

export type ExperimentsPageProps = ExperimentsPageDispatchProps &
  ExperimentsPageStateProps;
