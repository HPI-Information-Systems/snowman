import { Dataset } from '../../../server/types';
import { idSorter } from '../../tools/idSorter';
import { ExampleDatasets, exampleDatasets } from './datasets';

export const expectedDatasets = Object.values(
  exampleDatasets as ExampleDatasets
)
  .map(({ id, file, meta }) => {
    return {
      id,
      ...meta,
      numberOfUploadedRecords: file?.numberOfRecords,
      numberOfRecords:
        file || meta.numberOfRecords
          ? Math.max(file?.numberOfRecords ?? 0, meta.numberOfRecords ?? 0)
          : undefined,
    } as Dataset;
  })
  .sort(idSorter);
