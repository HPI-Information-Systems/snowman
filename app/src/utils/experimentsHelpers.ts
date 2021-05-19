import { Experiment } from 'api';

export const couldPreviewExperiment = (anExperiment: Experiment): boolean =>
  anExperiment.numberOfUploadedRecords !== undefined;
