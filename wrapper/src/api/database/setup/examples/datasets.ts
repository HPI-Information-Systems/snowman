import path from 'path';

import { DATABASE_SETUP_DIR } from '../../../config';
import { providers } from '../../../providers';
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
  restaurants: {
    meta: {
      name: 'hpi-restaurants',
      description:
        'Combined list of restaurants from different advisor services. (source: HPI FG Naumann)',
      tags: ['Restaurants', 'Locations'],
    },
    id: -1,
    file: {
      path: path.join(EXAMPLE_DATASET_DIR, 'hpi_restaurants.csv'),
      idColumn: 'id',
      separator: ',',
      quote: '"',
      escape: "'",
      numberOfRecords: 863,
    },
  },
  notebookToy: {
    meta: {
      name: 'SIGMOD-NotebookToy-X1',
      description:
        'This is the NotebookToy dataset (X1) of the SIGMOD-contest.',
      tags: ['SIGMOD'],
    },
    id: -2,
    file: {
      path: path.join(EXAMPLE_DATASET_DIR, 'sigmod_notebooktoy_X1.csv'),
      idColumn: 'instance_id',
      separator: ',',
      quote: '"',
      escape: '"',
      numberOfRecords: 43,
    },
  },
  notebook: {
    meta: {
      name: 'SIGMOD-Notebook-X2',
      description: 'This is the notebook dataset (X2) of the SIGMOD-contest.',
      tags: ['SIGMOD'],
    },
    id: -3,
    file: {
      path: path.join(EXAMPLE_DATASET_DIR, 'sigmod_notebook_X2.csv'),
      idColumn: 'instance_id',
      separator: ',',
      quote: '"',
      escape: '"',
      numberOfRecords: 343,
    },
  },
  magellanSongs: {
    meta: {
      name: 'magellan-songs',
      description:
        'The Million Song Dataset is a freely-available collection of audio features and metadata for a million contemporary popular music tracks. Magellan Songs includes a subset of the database with selected features.',
      tags: ['Songs', 'Music'],
    },
    id: -4,
    file: {
      path: path.join(EXAMPLE_DATASET_DIR, 'magellan_songs.csv'),
      idColumn: 'id',
      separator: ',',
      quote: '"',
      escape: "'",
      numberOfRecords: 1_000_000,
    },
  },
  freedbCds: {
    meta: {
      name: 'freedb-cds',
      description:
        'This dataset includes 9763 CDs randomly extracted from freeDB.',
      tags: ['Songs', 'Music', 'CDs'],
    },
    id: -5,
    file: {
      path: path.join(EXAMPLE_DATASET_DIR, 'freedb_cds.csv'),
      idColumn: 'id',
      separator: ',',
      quote: '"',
      escape: "'",
      numberOfRecords: 9763,
    },
  },
  cora: {
    meta: {
      name: 'hpi-cora',
      description:
        'This dataset includes bibliographical information about scientific papers. It provides 1879 objects.',
      tags: ['Papers', 'Locations'],
    },
    id: -6,
    file: {
      path: path.join(EXAMPLE_DATASET_DIR, 'hpi_cora.csv'),
      idColumn: 'id',
      separator: ',',
      quote: '"',
      escape: "'",
      numberOfRecords: 1879,
    },
  },
});
