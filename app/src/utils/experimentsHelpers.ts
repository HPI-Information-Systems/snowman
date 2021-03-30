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
        ...sourceList.slice(0, targetIndex),
        anExperiment,
        ...sourceList.slice(targetIndex),
      ];

export const couldPreviewExperiment = (anExperiment: Experiment): boolean =>
  anExperiment.numberOfUploadedRecords !== undefined;
