import { Experiment } from 'api';

export interface IntersectionSelectorStateProps {
  ignored: Experiment[];
  included: Experiment[];
  excluded: Experiment[];
}

export interface IntersectionSelectorDispatchProps {
  include(anExperiment: Experiment): void;
  exclude(anExperiment: Experiment): void;
  ignore(anExperiment: Experiment): void;
}

export type IntersectionSelectorProps = IntersectionSelectorDispatchProps &
  IntersectionSelectorStateProps;
