import path from 'path';

import { SetExperimentFileFormatEnum } from '../../../server/types';
import { SetupOptions } from '../../setup';
import {
  EXAMPLE_DATASET_DIR,
  EXAMPLE_EXPERIMENT_DIR,
  exampleAlgorithms,
  ExampleDatasets,
  exampleDatasets,
  ExampleExperiments,
  loadExampleDatasets,
  loadExampleExperiments,
} from '../../setup/examples';
import { SchemaVersion } from './schemaVersion';
import { SchemaV1 } from './v1';

const frozenNewDatasets: ExampleDatasets = {
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
};

const frozenNewExperiments: ExampleExperiments = {
  freedbCdsGoldstandard: {
    meta: {
      name: 'goldstandard',
      description:
        'Complete list of all duplicate pairs found in the original dataset.',
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.freedbCds.id,
    },
    id: -6,
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      path: path.join(EXAMPLE_EXPERIMENT_DIR, 'freedb_cds_goldstandard.csv'),
      numberOfPairs: 300,
    },
  },
  freedbCdsExampleRun: {
    meta: {
      name: 'examplerun',
      description: 'Randomly picked pairs - for testing purposes only!',
      algorithmId: exampleAlgorithms.mock.id,
      datasetId: exampleDatasets.freedbCds.id,
    },
    id: -7,
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      path: path.join(EXAMPLE_EXPERIMENT_DIR, 'freedb_cds_examplerun.csv'),
      numberOfPairs: 124,
    },
  },
  hpiCoraGoldstandard: {
    meta: {
      name: 'goldstandard',
      description:
        'Complete list of all duplicate pairs found in the original dataset.',
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.cora.id,
    },
    id: -8,
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      path: path.join(EXAMPLE_EXPERIMENT_DIR, 'hpi_cora_goldstandard.csv'),
      numberOfPairs: 64578,
    },
  },
  hpiCoraExampleRun: {
    meta: {
      name: 'examplerun',
      description: 'Randomly picked pairs - for testing purposes only!',
      algorithmId: exampleAlgorithms.mock.id,
      datasetId: exampleDatasets.cora.id,
    },
    id: -9,
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      path: path.join(EXAMPLE_EXPERIMENT_DIR, 'hpi_cora_examplerun.csv'),
      numberOfPairs: 767,
    },
  },
};

export class SchemaV2 extends SchemaVersion {
  readonly predecessor = new SchemaV1();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    if (options.loadExampleEntries) {
      await loadExampleDatasets(frozenNewDatasets);
      await loadExampleExperiments(frozenNewExperiments);
    }
  }
}
