import path from 'path';
import { assertType } from 'snowman-library';

import { DATABASE_SETUP_DIR } from '../../../config';
import { providers } from '../../../providers';
import {
  ExperimentId,
  ExperimentValues,
  SetExperimentFileFormatEnum,
} from '../../../server/types';
import { readFile } from '../../../tools/readFile';
import { exampleAlgorithms } from './algorithms';
import { exampleDatasets } from './datasets';

export const EXAMPLE_EXPERIMENT_DIR = path.join(
  DATABASE_SETUP_DIR,
  'experiments'
);

export type ExampleExperiments = {
  [key: string]: {
    meta: ExperimentValues;
    id: ExperimentId;
    file?: {
      path: string;
      format: SetExperimentFileFormatEnum;
      numberOfPairs: number;
    };
  };
};

export async function loadExampleExperiments(
  experiments: ExampleExperiments
): Promise<void> {
  const experimentProvider = providers.experiment;
  for (const { id, meta, file } of Object.values(experiments)) {
    experimentProvider.setExperiment(id, meta);
    if (file) {
      await experimentProvider.setExperimentFile(
        id,
        file.format,
        readFile(file.path)
      );
    }
  }
}

export const exampleExperiments = assertType<ExampleExperiments>()({
  restaurantGoldstandard1: {
    meta: {
      name: 'goldstandard',
      description:
        'Complete list of all duplicate pairs found in the original dataset.',
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.restaurants.id,
    },
    id: -1,
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      path: path.join(
        EXAMPLE_EXPERIMENT_DIR,
        'hpi_restaurants_goldstandard.csv'
      ),
      numberOfPairs: 112,
    },
  },
  restaurantExampleRun: {
    meta: {
      name: 'examplerun',
      description: 'Randomly picked pairs - for testing purposes only!',
      algorithmId: exampleAlgorithms.mock.id,
      datasetId: exampleDatasets.restaurants.id,
    },
    id: -2,
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      path: path.join(EXAMPLE_EXPERIMENT_DIR, 'hpi_restaurants_examplerun.csv'),
      numberOfPairs: 100,
    },
  },
  notebookToySigmodGoldstandard1: {
    meta: {
      name: 'SIGMOD-notebookToy-goldstandard-Y1',
      description:
        'Complete list of duplicate pairs in the NotebookToy dataset (X1) of the SIGMOD contest.',
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.notebookToy.id,
    },
    id: -3,
    file: {
      format: SetExperimentFileFormatEnum.Sigmod2021,
      path: path.join(
        EXAMPLE_EXPERIMENT_DIR,
        'sigmod_notebooktoy_goldstandard.csv'
      ),
      numberOfPairs: 903,
    },
  },
  notebookSigmodGoldstandard: {
    meta: {
      name: 'SIGMOD-notebook-goldstandard-Y2',
      description:
        'Complete list of duplicate pairs in the notebook dataset (X2) of the SIGMOD contest.',
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.notebook.id,
    },
    id: -4,
    file: {
      format: SetExperimentFileFormatEnum.Sigmod2021,
      path: path.join(
        EXAMPLE_EXPERIMENT_DIR,
        'sigmod_notebook_goldstandard.csv'
      ),
      numberOfPairs: 58653,
    },
  },
  magellanGoldstandard: {
    meta: {
      name: 'goldstandard',
      description:
        'Complete list of all duplicate pairs found in the original dataset.',
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.magellanSongs.id,
    },
    id: -5,
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      path: path.join(
        EXAMPLE_EXPERIMENT_DIR,
        'magellan_songs_goldstandard.csv'
      ),
      numberOfPairs: 1292022,
    },
  },
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
});
