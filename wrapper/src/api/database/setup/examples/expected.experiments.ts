import { ExperimentConverter } from '../../../providers/experiment/experimentProvider/util/converter';
import { Experiment } from '../../../server/types';
import { idSorter } from '../../tools/idSorter';
import { ExampleExperiments, exampleExperiments } from './experiments';

const experimentConverter = new ExperimentConverter();
export const expectedExperiments = Object.values(
  exampleExperiments as ExampleExperiments
)
  .map(
    ({ id, meta, file }) =>
      ({
        id,
        ...meta,
        numberOfUploadedRecords: file?.numberOfPairs,
      } as Experiment)
  )
  .map(
    experimentConverter.apiExperimentToStoredExperiment.bind(
      experimentConverter
    )
  )
  .map(
    experimentConverter.storedExperimentToApiExperiment.bind(
      experimentConverter
    )
  )
  .sort(idSorter);
