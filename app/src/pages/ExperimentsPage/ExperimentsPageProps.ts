import { Algorithm, Dataset, Experiment } from 'api';

export interface ExperimentsPageStateProps {
  matchingSolutions: Algorithm[];
  selectedMatchingSolutions: Algorithm[];
  datasets: Dataset[];
  selectedDatasets: Dataset[];
  currentExperiments: Experiment[];
}

export interface ExperimentsPageDispatchProps {
  loadExperiments(): void;
}

export type ExperimentsPageProps = ExperimentsPageDispatchProps &
  ExperimentsPageStateProps;
