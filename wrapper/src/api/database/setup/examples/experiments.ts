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
  gold: {
    id: 1,
    meta: {
      algorithmId: exampleAlgorithms.gold.id,
      datasetId: exampleDatasets.krankenhaus.id,
      name: 'Echte Duplikate',
      description: 'vollständige Liste aller Duplikate',
    },
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      numberOfPairs: NaN,
      path: path.join(EXAMPLE_EXPERIMENT_DIR, 'gold.csv'),
    },
  },
  alpha: {
    id: 2,
    meta: {
      algorithmId: exampleAlgorithms.alpha.id,
      datasetId: exampleDatasets.krankenhaus.id,
      name: 'Alpha',
      description: 'von Alpha vermutete Duplikate',
      softKPIs: {
        // TODO SoftKPIs here
      },
    },
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      numberOfPairs: NaN,
      path: path.join(EXAMPLE_EXPERIMENT_DIR, 'alpha.csv'),
    },
  },
  beta: {
    id: 3,
    meta: {
      algorithmId: exampleAlgorithms.beta.id,
      datasetId: exampleDatasets.krankenhaus.id,
      name: 'Beta',
      description: 'von Beta vermutete Duplikate',
    },
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      numberOfPairs: NaN,
      path: path.join(EXAMPLE_EXPERIMENT_DIR, 'beta.csv'),
    },
  },
  gamma: {
    id: 4,
    meta: {
      algorithmId: exampleAlgorithms.gamma.id,
      datasetId: exampleDatasets.krankenhaus.id,
      name: 'Gamma',
      description: 'von Gamma vermutete Duplikate',
    },
    file: {
      format: SetExperimentFileFormatEnum.Pilot,
      numberOfPairs: NaN,
      path: path.join(EXAMPLE_EXPERIMENT_DIR, 'gamma.csv'),
    },
  },
});
