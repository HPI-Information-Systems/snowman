import { Experiment } from '../../../server/types';
import { idSorter } from '../../tools/idSorter';
import { ExampleExperiments, exampleExperiments } from './experiments';

export const expectedExperiments = Object.values(
  exampleExperiments as ExampleExperiments
)
  .map(({ id, meta, file }) => {
    return {
      id,
      ...meta,
      numberOfUploadedRecords: file?.numberOfPairs,
    } as Experiment;
  })
  .sort(idSorter);
