import { setupDatabase } from '../../database';
import {
  DatasetValues,
  ExperimentValues,
  SetExperimentFileFormatEnum,
  SimilarityThresholdFunctionDefinitionTypeEnum,
} from '../../server/types';
import { fileToReadable } from '../../tools/test/filtToReadable';
import { providers } from '..';
import { sortTestFileResponse } from './idsToRecords/test/sortFileResponse';
import { loadTestDataset } from './intersection/test/testCases';

interface metaDataset {
  name: string;
  data: DatasetValues;
}
interface metaExperiment {
  name: string;
  data: { meta: ExperimentValues; file: string[][] };
}

const datasetIds: Record<string, number> = {};
const experimentIds: Record<string, number> = {};
let addedAlgorithmId: number;

beforeAll(async () => {
  await setupDatabase({ temporary: true, loadExampleEntries: false });
  const metaDatasets: metaDataset[] = [
    {
      name: 'default',
      data: {
        description: 'Mock 2',
        name: 'Mock 2',
        tags: [],
        numberOfRecords: 20,
      },
    },
    {
      name: 'dataset2',
      data: {
        description: 'Mock 2',
        name: 'Mock 2',
        tags: [],
        numberOfRecords: 20,
      },
    },
    {
      name: 'no_numberOfRecords',
      data: {
        description: 'Mock 2',
        name: 'Mock 2',
        tags: [],
        numberOfRecords: 20,
      },
    },
  ];

  for (const metaDataset of metaDatasets) {
    const id = providers.dataset.addDataset(metaDataset.data);
    datasetIds[metaDataset.name] = id;
  }

  const meta_algorithm = { description: 'Mock 1', name: 'Mock 1' };
  addedAlgorithmId = providers.algorithm.addAlgorithm(meta_algorithm);

  const experiments: metaExperiment[] = [
    {
      name: 'goldstandard',
      data: {
        meta: {
          algorithmId: addedAlgorithmId,
          datasetId: datasetIds.default,
          description: 'Dataset file',
          name: 'Dataset file',
        },
        file: [
          ['p1', 'p2'],
          ['1', '2'],
          ['3', '4'],
          ['5', '6'],
          ['2', '3'],
          ['7', '8'],
        ],
      },
    },
    {
      name: 'experiment1',
      data: {
        meta: {
          algorithmId: addedAlgorithmId,
          datasetId: datasetIds.default,
          description: 'No dataset file',
          name: 'No dataset file',
        },
        file: [
          ['p1', 'p2'],
          ['1', '2'],
          ['9', '10'],
        ],
      },
    },
    {
      name: 'experiment2',
      data: {
        meta: {
          algorithmId: addedAlgorithmId,
          datasetId: datasetIds.no_numberOfRecords,
          description: 'No dataset file',
          name: 'No dataset file',
        },
        file: [
          ['p1', 'p2'],
          ['1', '2'],
          ['9', '10'],
        ],
      },
    },
    {
      name: 'experiment_dataset2',
      data: {
        meta: {
          algorithmId: addedAlgorithmId,
          datasetId: datasetIds.dataset2,
          description: 'No dataset file',
          name: 'No dataset file',
        },
        file: [
          ['p1', 'p2'],
          ['1', '2'],
          ['9', '10'],
        ],
      },
    },
  ];

  for (const experiment of experiments) {
    const id = providers.experiment.addExperiment(experiment.data.meta);
    await providers.experiment.setExperimentFile(
      id,
      SetExperimentFileFormatEnum.Pilot,
      fileToReadable(experiment.data.file)
    );
    experimentIds[experiment.name] = id;
  }
});

describe('test benchmark functions', () => {
  describe('metrics', () => {
    test('test metrics calculation', () => {
      expect(
        providers.benchmark
          .getBinaryMetrics(
            {
              experimentId: experimentIds.goldstandard,
            },
            { experimentId: experimentIds.experiment1 }
          )
          .map(({ name, value }) => {
            return { name, value: value.toFixed(4) };
          })
      ).toEqual(
        expect.arrayContaining(
          [
            { name: 'accuracy', value: '0.9579' },
            { name: 'balanced accuracy', value: '0.5598' },
            { name: 'bookmaker informedness', value: '0.1195' },
            { name: 'f1 score', value: '0.2000' },
            { name: 'f* score', value: '0.1111' },
            { name: 'false discovery rate', value: '0.5000' },
            { name: 'false negative rate', value: '0.8750' },
            { name: 'false omission rate', value: '0.0372' },
            { name: 'false positive rate', value: '0.0055' },
            { name: 'fowlkes mallows index', value: '0.2500' },
            { name: 'markedness', value: '0.4628' },
            { name: 'matthews correlation coeff.', value: '0.2352' },
            { name: 'negative predictive value', value: '0.9628' },
            { name: 'precision', value: '0.5000' },
            { name: 'prevalence threshold', value: '0.1733' },
            { name: 'recall', value: '0.1250' },
            { name: 'specificity', value: '0.9945' },
            { name: 'threat score', value: '0.1111' },
          ].map((metric) => expect.objectContaining(metric))
        )
      );
    });

    test('throw error at empty datasetAmount', () => {
      expect(() =>
        providers.benchmark.getBinaryMetrics(
          { experimentId: experimentIds.goldstandard },
          { experimentId: experimentIds.experiment2 }
        )
      ).toThrowError();
    });

    test('throw error when tests belong to different datasets', () => {
      expect(() =>
        providers.benchmark.getBinaryMetrics(
          { experimentId: experimentIds.experiment2 },
          { experimentId: experimentIds.experiment_dataset2 }
        )
      ).toThrowError();
    });
  });

  test('Returns correct intersection when same experiment occurs multiple times in single config', async () => {
    const datasetId = await loadTestDataset(4);
    const experimentId = providers.experiment.addExperiment({
      algorithmId: addedAlgorithmId,
      datasetId,
      name: '',
    });
    await providers.experiment.setExperimentFile(
      experimentId,
      SetExperimentFileFormatEnum.Pilot,
      fileToReadable([
        ['p1', 'p2', 'sim'],
        ['0', '1', '3'],
        ['1', '2', '2'],
        ['2', '3', '1'],
      ])
    );
    const func = providers.similarityThresholds.addSimilarityThresholdFunction({
      similarityThresholdFunction: {
        definition: {
          type:
            SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
          similarityThreshold: 'sim',
        },
        name: 'similarityFunction',
        experimentId,
      },
    });
    expect(
      sortTestFileResponse(
        providers.benchmark.calculateExperimentIntersectionRecords({
          intersection: [
            { experimentId, predictedCondition: true },
            { experimentId, predictedCondition: true },
            {
              experimentId,
              predictedCondition: false,
              similarity: { func, threshold: 2 },
            },
          ],
        })
      )
    ).toEqual(
      sortTestFileResponse({
        header: ['id'],
        data: [['1'], ['3'], [], ['0'], ['3'], [], ['2'], ['3'], []],
      })
    );
    expect(
      sortTestFileResponse(
        providers.benchmark.calculateExperimentIntersectionRecords({
          intersection: [
            {
              experimentId,
              predictedCondition: true,
              similarity: { func, threshold: 0 },
            },
            {
              experimentId,
              predictedCondition: false,
              similarity: { func, threshold: 2 },
            },
            {
              experimentId,
              predictedCondition: false,
              similarity: { func, threshold: 3 },
            },
          ],
        })
      )
    ).toEqual(
      sortTestFileResponse({
        header: ['id'],
        data: [['3'], ['2'], [], ['3'], ['1'], [], ['3'], ['0'], []],
      })
    );
    expect(
      providers.benchmark.calculateExperimentIntersectionCount({
        intersection: [
          {
            experimentId,
            predictedCondition: true,
            similarity: { func, threshold: 1 },
          },
          {
            experimentId,
            predictedCondition: false,
            similarity: { func, threshold: 3 },
          },
        ],
      }).numberPairs
    ).toEqual(5);
  });
});
