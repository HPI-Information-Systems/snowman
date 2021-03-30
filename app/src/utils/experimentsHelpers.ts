import { Experiment } from 'api';

export const getExperimentNameFromId = (
  anId: number,
  allExperiments: Experiment[]
): string =>
  allExperiments.find(
    (anExperiment: Experiment): boolean => anExperiment.id === anId
  )?.name ?? '';

export const couldPreviewExperiment = (anExperiment: Experiment): boolean =>
  anExperiment.numberOfUploadedRecords !== undefined;
