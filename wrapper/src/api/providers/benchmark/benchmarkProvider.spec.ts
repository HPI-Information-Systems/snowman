import { setupDatabase } from '../../database';
import {
  AlgorithmValues,
  DatasetValues,
  ExperimentValues,
  MetricsEnum,
  SetExperimentFileFormatEnum,
  SimilarityThresholdFunctionValuesTypeEnum,
  SoftKPIsAlgorithmEnum,
  SoftKPIsExperimentEnum,
} from '../../server/types';
import { fileToReadable } from '../../tools/test/filtToReadable';
import { AlgorithmProvider } from '../algorithm/algorithmProvider';
import { DatasetProvider } from '../dataset/datasetProvider';
import { ExperimentProvider } from '../experiment/experimentProvider';
import { SimilarityThresholdsProvider } from '../similarityThresholds/similarityThresholdsProvider';
import { BenchmarkProvider } from './benchmarkProvider';

interface metaDataset {
  name: string;
  data: DatasetValues;
}
interface metaExperiment {
  name: string;
  data: { meta: ExperimentValues; file: string[][] };
}

let datasetProvider: DatasetProvider;
let algorithmProvider: AlgorithmProvider;
let experimentProvider: ExperimentProvider;
const datasetIds: Record<string, number> = {};
const experimentIds: Record<string, number> = {};

beforeAll(async () => {
  await setupDatabase({ temporary: true, loadExampleEntries: false });
  experimentProvider = new ExperimentProvider();
  algorithmProvider = new AlgorithmProvider();
  datasetProvider = new DatasetProvider();
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
    const id = datasetProvider.addDataset(metaDataset.data);
    datasetIds[metaDataset.name] = id;
  }

  const meta_algorithm: AlgorithmValues = {
    description: 'Mock 1',
    name: 'Mock 1',
    softKPIs: {
      configurationEffort: {
        domain: {
          expertise: 12,
          hrAmount: 10,
        },
      },
    },
  };
  const addedAlgorithmId = algorithmProvider.addAlgorithm(meta_algorithm);
  const experiments: metaExperiment[] = [
    {
      name: 'goldstandard',
      data: {
        meta: {
          algorithmId: addedAlgorithmId,
          datasetId: datasetIds.default,
          description: 'Dataset file',
          name: 'Dataset file',
          softKPIs: {
            hrAmount: 12,
            expertise: 67,
          },
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
          softKPIs: {
            expertise: 11,
            hrAmount: 11,
          },
        },
        file: [
          ['p1', 'p2', 'similarity'],
          ['1', '2', '0.5'],
          ['9', '10', '0.7'],
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
    const id = experimentProvider.addExperiment(experiment.data.meta);
    await experimentProvider.setExperimentFile(
      id,
      SetExperimentFileFormatEnum.Pilot,
      fileToReadable(experiment.data.file)
    );
    experimentIds[experiment.name] = id;
  }
});
describe('test benchmark functions', () => {
  const benchmarkProvider = new BenchmarkProvider();
  test('test developer diagram calculation', () => {
    expect(
      benchmarkProvider.calculateDiagramData({
        xAxis: SoftKPIsExperimentEnum.HrAmount,
        yAxis: MetricsEnum.Precision,
        diagram: {
          multipleExperiments: [
            {
              experiment: {
                experimentId: experimentIds.experiment1,
              },
              groundTruth: {
                experimentId: experimentIds.goldstandard,
              },
            },
          ],
        },
      })
    ).toMatchObject([{ x: 11, y: 0.5 }]);
  });
  test('test softKPI-softKPI diagram calculation', () => {
    expect(
      benchmarkProvider.calculateDiagramData({
        xAxis: SoftKPIsExperimentEnum.HrAmount,
        yAxis: SoftKPIsAlgorithmEnum.DomainExpertise,
        diagram: {
          multipleExperiments: [
            {
              experiment: {
                experimentId: experimentIds.experiment1,
              },
              groundTruth: {
                experimentId: experimentIds.goldstandard,
              },
            },
            {
              experiment: {
                experimentId: experimentIds.experiment1,
              },
              groundTruth: {
                experimentId: experimentIds.goldstandard,
              },
            },
          ],
        },
      })
    ).toMatchObject([
      { x: 11, y: 12 },
      { x: 11, y: 12 },
    ]);
  });
  test('test metric-metric diagram calculation', () => {
    expect(
      benchmarkProvider.calculateDiagramData({
        xAxis: MetricsEnum.Precision,
        yAxis: MetricsEnum.Recall,
        diagram: {
          multipleExperiments: [
            {
              experiment: {
                experimentId: experimentIds.experiment1,
              },
              groundTruth: {
                experimentId: experimentIds.goldstandard,
              },
            },
          ],
        },
      })
    ).toMatchObject([{ x: 0.5, y: 0.125 }]);
  });
  test('test metric-metric threshold diagram calculation', () => {
    const similarityThresholdProvider = new SimilarityThresholdsProvider();
    const func = {
      type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
      similarityThreshold: 'similarity',
    };
    const funcId = similarityThresholdProvider.addSimilarityThresholdFunction({
      experimentId: experimentIds.experiment1,
      similarityThresholdFunction: func,
    });
    expect(
      benchmarkProvider.calculateDiagramData({
        xAxis: MetricsEnum.Precision,
        yAxis: MetricsEnum.Recall,
        diagram: {
          similarityThresholds: {
            steps: 2,
            groundTruthId: experimentIds.goldstandard,
            experimentId: experimentIds.experiment1,
            func: funcId,
          },
        },
      })
    ).toMatchObject([
      { x: 0, y: 0, threshold: 0.7 },
      { threshold: 0.5, x: 0.5, y: 0.125 },
    ]);
  });
  describe('metrics', () => {
    test('test metrics calculation', () => {
      expect(
        benchmarkProvider
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
        benchmarkProvider.getBinaryMetrics(
          { experimentId: experimentIds.goldstandard },
          { experimentId: experimentIds.experiment2 }
        )
      ).toThrowError();
    });
    test('throw error when tests belong to different datasets', () => {
      expect(() =>
        benchmarkProvider.getBinaryMetrics(
          { experimentId: experimentIds.experiment2 },
          { experimentId: experimentIds.experiment_dataset2 }
        )
      ).toThrowError();
    });
  });
});
