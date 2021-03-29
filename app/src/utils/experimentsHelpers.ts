import { Experiment } from 'api';

export const getExperimentNameFromId = (
  anId: number,
  allExperiments: Experiment[]
): string =>
  allExperiments.find(
    (anExperiment: Experiment): boolean => anExperiment.id === anId
  )?.name ?? '';

export const insertExperimentAt = (
  sourceList: Experiment[],
  anExperiment: Experiment,
  targetIndex: number
): Experiment[] =>
  sourceList.length === 0
    ? [anExperiment]
    : [
        ...sourceList.splice(0, targetIndex),
        anExperiment,
        ...sourceList.slice(targetIndex),
      ];

export const filterOutAnExperiment = (
  aBucket: Experiment[],
  anExperiment: Experiment
): Experiment[] =>
  aBucket.filter(
    (currentExperiment: Experiment): boolean =>
      currentExperiment.id !== anExperiment.id
  );
