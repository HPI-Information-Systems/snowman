import { DatasetConverter } from '../../../providers/dataset/datasetProvider/util/converter';
import { Dataset } from '../../../server/types';
import { idSorter } from '../../tools/idSorter';
import { ExampleDatasets, exampleDatasets } from './datasets';

const datasetConverter = new DatasetConverter();

export const expectedDatasets = Object.values(
  exampleDatasets as ExampleDatasets
)
  .map(
    ({ id, file, meta }) =>
      ({
        id,
        ...meta,
        numberOfUploadedRecords: file?.numberOfRecords,
        numberOfRecords:
          file || meta.numberOfRecords
            ? Math.max(file?.numberOfRecords ?? 0, meta.numberOfRecords ?? 0)
            : undefined,
      } as Dataset)
  )
  .map(datasetConverter.apiDatasetToStoredDataset.bind(datasetConverter))
  .map(datasetConverter.storedDatasetToAPIDataset.bind(datasetConverter))
  .sort(idSorter);
