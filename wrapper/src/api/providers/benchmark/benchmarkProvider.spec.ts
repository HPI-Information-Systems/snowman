import { setupDatabase } from '../../database';
import {
  AlgorithmValues,
  DatasetValues,
  ExperimentValues,
  MetricsEnum,
  SetExperimentFileFormatEnum,
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionValues,
  SoftKPIsAlgorithmEnum,
  SoftKPIsExperimentEnum,
} from '../../server/types';
import { fileToReadable } from '../../tools/test/filtToReadable';
import { providers } from '..';
import { SimilarityThresholdsProvider } from '../similarityThresholds/similarityThresholdsProvider';
import { BenchmarkProvider } from './benchmarkProvider';
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

  const meta_algorithm: AlgorithmValues = {
    description: 'Mock 1',
    name: 'Mock 1',
    softKPIs: {
      integrationEffort: {
        installationEffort: {
          expertise: 30,
          hrAmount: 10,
        },
        deploymentType: ['cloud'],
        solutionType: ['rulebased'],
        useCase: ['merging'],
        generalCosts: 10,
      },
      configurationEffort: {
        domain: {
          expertise: 12,
          hrAmount: 10,
        },
        matchingSolution: {
          expertise: 12,
          hrAmount: 10,
        },
        interfaces: ['GUI'],
        supportedOSs: ['Windows'],
      },
    },
  };
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
    ).toMatchObject({
      coordinates: [{ experimentId: 2, x: 11, y: 0.5 }],
      definitionRange: undefined,
      valueRange: [0, 1],
    });
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
    ).toMatchObject({
      coordinates: [
        { experimentId: 2, x: 11, y: 12 },
        { experimentId: 2, x: 11, y: 12 },
      ],
      definitionRange: undefined,
      valueRange: [0, 100],
    });
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
    ).toMatchObject({
      coordinates: [{ experimentId: 2, x: 0.5, y: 0.125 }],
      definitionRange: [0, 1],
      valueRange: [0, 1],
    });
  });
  test('test metric-metric threshold diagram calculation', () => {
    const similarityThresholdProvider = new SimilarityThresholdsProvider();
    const func: SimilarityThresholdFunctionValues = {
      definition: {
        type: SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
        similarityThreshold: 'similarity',
      },
      name: 'function1',
      experimentId: experimentIds.experiment1,
    };
    const funcId = similarityThresholdProvider.addSimilarityThresholdFunction({
      similarityThresholdFunction: func,
    });
    expect(
      benchmarkProvider.calculateDiagramData({
        xAxis: MetricsEnum.Precision,
        yAxis: MetricsEnum.Similarity,
        diagram: {
          similarityThresholds: {
            steps: 2,
            groundTruthId: experimentIds.goldstandard,
            experimentId: experimentIds.experiment1,
            func: funcId,
          },
        },
      })
    ).toMatchObject({
      coordinates: [
        { threshold: 0.7, x: 0, y: 0.7 },
        { threshold: 0.5, x: 0.5, y: 0.5 },
      ],
      definitionRange: [0, 1],
      valueRange: [0, 1],
    });
  });
  test('test if all enum values return value', () => {
    const diagramAxisValues = {
      ...SoftKPIsAlgorithmEnum,
      ...SoftKPIsExperimentEnum,
      ...MetricsEnum,
    };
    const result = [];
    for (const value of Object.values(diagramAxisValues)) {
      if (
        (value as
          | SoftKPIsExperimentEnum
          | SoftKPIsAlgorithmEnum
          | MetricsEnum) === MetricsEnum.Similarity
      )
        continue;
      result.push({
        name: value,
        value: benchmarkProvider
          .calculateDiagramData({
            xAxis: value as
              | SoftKPIsExperimentEnum
              | SoftKPIsAlgorithmEnum
              | MetricsEnum,
            yAxis: value as
              | SoftKPIsExperimentEnum
              | SoftKPIsAlgorithmEnum
              | MetricsEnum,
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
          .coordinates[0].x?.toFixed(4),
      });
    }
    expect(result).toEqual(
      expect.arrayContaining([
        { name: 'domainExpertise', value: '12.0000' },
        { name: 'domainHrAmount', value: '10.0000' },
        { name: 'domainManhattanDistanceBasedEffort', value: '22.0000' },
        { name: 'domainHrAmountWeightedEffort', value: '2643.1759' },
        { name: 'domainMultiplyEffort', value: '120.0000' },
        { name: 'domainExpertiseWeightedEffort', value: '11.2750' },
        { name: 'matchingSolutionExpertise', value: '12.0000' },
        { name: 'matchingSolutionHrAmount', value: '10.0000' },
        {
          name: 'matchingSolutionManhattanDistanceBasedEffort',
          value: '22.0000',
        },
        { name: 'matchingSolutionHrAmountWeightedEffort', value: '2643.1759' },
        { name: 'matchingSolutionMultiplyEffort', value: '120.0000' },
        { name: 'matchingSolutionExpertiseWeightedEffort', value: '11.2750' },
        { name: 'generalCosts', value: '10.0000' },
        { name: 'installationExpertise', value: '30.0000' },
        { name: 'installationHrAmount', value: '10.0000' },
        { name: 'installationManhattanDistanceBasedEffort', value: '40.0000' },
        { name: 'installationHrAmountWeightedEffort', value: '6607.9397' },
        { name: 'installationMultiplyEffort', value: '300.0000' },
        { name: 'installationExpertiseWeightedEffort', value: '13.4986' },
        { name: 'expertise', value: '11.0000' },
        { name: 'hrAmount', value: '11.0000' },
        { name: 'manhattanDistanceBasedEffort', value: '22.0000' },
        { name: 'hrAmountWeightedEffort', value: '6586.1556' },
        { name: 'multiplyEffort', value: '121.0000' },
        { name: 'expertiseWeightedEffort', value: '12.2791' },
        { name: 'falseDiscoveryRate', value: '0.5000' },
        { name: 'falseNegativeRate', value: '0.8750' },
        { name: 'falseOmissionRate', value: '0.0372' },
        { name: 'falsePositiveRate', value: '0.0055' },
        { name: 'negativePredictiveValue', value: '0.9628' },
        { name: 'precision', value: '0.5000' },
        { name: 'prevalenceThreshold', value: '0.1733' },
        { name: 'recall', value: '0.1250' },
        { name: 'specificity', value: '0.9945' },
        { name: 'threatScore', value: '0.1111' },
        { name: 'accuracy', value: '0.9579' },
        { name: 'balancedAccuracy', value: '0.5598' },
        { name: 'bookmakerInformedness', value: '0.1195' },
        { name: 'fStarScore', value: '0.1111' },
        { name: 'f1Score', value: '0.2000' },
        { name: 'fowlkesMallowsIndex', value: '0.2500' },
        { name: 'markedness', value: '0.4628' },
        { name: 'matthewsCorrelationCoefficient', value: '0.2352' },
      ])
    );
  });
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
