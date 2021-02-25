import path from 'path';

import { DATABASE_SETUP_DIR } from '../../../config';
import { getProviders } from '../../../providers';
import { DatasetId, DatasetValues } from '../../../server/types';
import { readFile } from '../../../tools/readFile';
import { assertType } from '../../../tools/types';

const EXAMPLE_DATASET_DIR = path.join(DATABASE_SETUP_DIR, 'datasets');

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
  const datasetProvider = getProviders().dataset;
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
  restaurants: {
    meta: {
      name: 'hpi-restaurants',
      description:
        'Combined list of restaurants from different advisor services. (source: HPI FG Naumann)',
      tags: ['Restaurants', 'Locations'],
    },
    id: 1,
    file: {
      path: path.join(EXAMPLE_DATASET_DIR, 'hpi_restaurants.csv'),
      idColumn: 'id',
      separator: ',',
      quote: '"',
      escape: "'",
      numberOfRecords: 863,
    },
  },
  computers: {
    meta: {
      name: 'computers-SIGMOD',
      description: 'This is a dataset used for the SIGMOD-contest.',
      tags: ['SIGMOD'],
    },
    id: 2,
    file: {
      path: path.join(EXAMPLE_DATASET_DIR, 'computers_sigmod.csv'),
      idColumn: 'instance_id',
      separator: ',',
      quote: '"',
      escape: '"',
      numberOfRecords: 43,
    },
  },
});
