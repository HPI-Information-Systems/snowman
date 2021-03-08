import path from 'path';

import { DATABASE_SETUP_DIR } from '../../../config';
import { getProviders } from '../../../providers';
import {
  ExperimentFileFormat,
  ExperimentId,
  ExperimentValues,
} from '../../../server/types';
import { readFile } from '../../../tools/readFile';
import { assertType } from '../../../tools/types';
import { exampleAlgorithms } from './algorithms';
import { exampleDatasets } from './datasets';

const EXAMPLE_EXPERIMENT_DIR = path.join(DATABASE_SETUP_DIR, 'experiments');

export type ExampleExperiments = {
  [key: string]: {
    meta: ExperimentValues;
    id: ExperimentId;
    file?: {
      path: string;
      format: ExperimentFileFormat;
      numberOfPairs: number;
    };
  };
};

export async function loadExampleExperiments(
  experiments: ExampleExperiments
): Promise<void> {
  const experimentProvider = getProviders().experiment;
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
      name: 'goldstandard1',
      description:
        'Complete list of all duplicate pairs found in the original datasets.',
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.restaurants.id,
    },
    id: 1,
    file: {
      format: 'pilot',
      path: path.join(
        EXAMPLE_EXPERIMENT_DIR,
        'hpi_restaurants_goldstandard.csv'
      ),
      numberOfPairs: 112,
    },
  },
  restaurantExampleRun1: {
    meta: {
      name: 'examplerun1',
      description: 'Randomly picked pairs - for testing purposes only!',
      algorithmId: exampleAlgorithms.mock.id,
      datasetId: exampleDatasets.restaurants.id,
    },
    id: 2,
    file: {
      format: 'pilot',
      path: path.join(EXAMPLE_EXPERIMENT_DIR, 'hpi_restaurants_examplerun.csv'),
      numberOfPairs: 100,
    },
  },
  computersSigmodGoldstandard1: {
    meta: {
      name: 'SIGMOD-goldstandard-Y1',
      description:
        'Complete list of duplicate pairs in the NotebookToy dataset (X1) of the SIGMOD contest.',
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.computers.id,
    },
    id: 3,
    file: {
      format: 'sigmod2021',
      path: path.join(
        EXAMPLE_EXPERIMENT_DIR,
        'sigmod_notebooktoy_goldstandard.csv'
      ),
      numberOfPairs: 903,
    },
  },
});
