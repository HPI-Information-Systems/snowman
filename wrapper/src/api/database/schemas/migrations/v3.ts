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
import { SchemaV2 } from './v2';

const frozenNewDatasets: ExampleDatasets = {
  notebookLarge: {
    meta: {
      name: 'SIGMOD-NotebookLarge-X3',
      description:
        'This is the notebook large dataset (X3) of the SIGMOD-contest.',
      tags: ['SIGMOD'],
    },
    id: -7,
    file: {
      path: path.join(EXAMPLE_DATASET_DIR, 'sigmod_notebookLarge_X3.csv'),
      idColumn: 'instance_id',
      separator: ',',
      quote: '"',
      escape: '"',
      numberOfRecords: 337,
    },
  },
  altoSight: {
    meta: {
      name: 'SIGMOD-AltoSight-X4',
      description: 'This is the altoSight dataset (X4) of the SIGMOD-contest.',
      tags: ['SIGMOD'],
    },
    id: -8,
    file: {
      path: path.join(EXAMPLE_DATASET_DIR, 'sigmod_altosight_X4.csv'),
      idColumn: 'instance_id',
      separator: ',',
      quote: '"',
      escape: '"',
      numberOfRecords: 835,
    },
  },
};

const frozenNewExperiments: ExampleExperiments = {
  notebookLargeSigmodGoldstandard: {
    meta: {
      name: 'SIGMOD-notebooklarge-goldstandard-Y3',
      description:
        'Complete list of duplicate pairs in the notebook large dataset (X3) of the SIGMOD contest.',
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.notebookLarge.id,
    },
    id: -10,
    file: {
      format: SetExperimentFileFormatEnum.Sigmod2021,
      path: path.join(
        EXAMPLE_EXPERIMENT_DIR,
        'sigmod_notebooklarge_goldstandard.csv'
      ),
      numberOfPairs: 56616,
    },
  },
  altoSightSigmodGoldstandard: {
    meta: {
      name: 'SIGMOD-altosight-goldstandard-Y4',
      description:
        'Complete list of duplicate pairs in the altoSight dataset (X4) of the SIGMOD contest.',
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.altoSight.id,
    },
    id: -11,
    file: {
      format: SetExperimentFileFormatEnum.Sigmod2021,
      path: path.join(
        EXAMPLE_EXPERIMENT_DIR,
        'sigmod_altosight_goldstandard.csv'
      ),
      numberOfPairs: 348195,
    },
  },
};

export class SchemaV3 extends SchemaVersion {
  readonly predecessor = new SchemaV2();

  protected async migrateFromLastVersion(options: SetupOptions): Promise<void> {
    if (options.loadExampleEntries) {
      await loadExampleDatasets(frozenNewDatasets);
      await loadExampleExperiments(frozenNewExperiments);
    }
  }
}
