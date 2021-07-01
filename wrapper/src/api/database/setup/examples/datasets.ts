import path from 'path';
import { assertType } from 'snowman-library';

import { DATABASE_SETUP_DIR } from '../../../config';
import { providers } from '../../../providers';
import { DatasetId, DatasetValues } from '../../../server/types';
import { readFile } from '../../../tools/readFile';

export const EXAMPLE_DATASET_DIR = path.join(DATABASE_SETUP_DIR, 'datasets');

export type ExampleDatasets = {
  [key: string]: {
    meta: DatasetValues;
    id: DatasetId;
    file?: {
      path: string;
      idColumn: string;
      separator: string;
      quote: string;
      escape: string;
      numberOfRecords: number;
    };
  };
};

export async function loadExampleDatasets(
  datasets: ExampleDatasets
): Promise<void> {
  const datasetProvider = providers.dataset;
  for (const { id, meta, file } of Object.values(datasets)) {
    datasetProvider.setDataset(id, meta);
    if (file) {
      await datasetProvider.setDatasetFile(
        id,
        readFile(file.path),
        file.idColumn,
        file.quote,
        file.escape,
        file.separator
      );
    }
  }
}

export const exampleDatasets = assertType<ExampleDatasets>()({
  krankenhaus: {
    meta: {
      name: 'Krankenhaus Testdatensatz',
      description: 'Teil des echten Krankenhausdatensatzes',
      numberOfRecords: 100,
      tags: ['Personen', 'Krankenhaus', 'Namen', 'Adressen'],
    },
    id: 1,
    file: {
      escape: '\\',
      idColumn: 'id',
      numberOfRecords: 100,
      path: path.join(EXAMPLE_DATASET_DIR, 'krankenhaus.csv'),
      quote: '"',
      separator: ';',
    },
  },
});
