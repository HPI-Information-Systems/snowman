import { setupDatabase } from '../../../../database';
import {
  DatasetId,
  ExperimentId,
  SetExperimentFileFormatEnum,
  SimilarityThresholdFunctionId,
  SimilarityThresholdFunctionValues,
  SimilarityThresholdFunctionValuesTypeEnum,
} from '../../../../server/types';
import { fileToReadable } from '../../../../tools/test/filtToReadable';
import { providers } from '../../..';
import { RelaxedClustering } from '../../cluster/test/relaxedClusterings';
import { loadTestCase } from '../../intersection/test/testCases';
import { Precision } from '../basic/precision';
import { plot, PlotResult } from './plot';
import {
  plotSimilarityConfusionMatrix,
  PlotSimilarityConfusionMatrixResult,
} from './similarityConfusionMatrix';

type SimilarityFunctionPlotTestCase = {
  datasetNumberOfRecords: number;
  links: [id1: number, id2: number, similarity: number][];
  func: SimilarityThresholdFunctionValues;
  params: {
    groundTruth: RelaxedClustering;
    minThreshold?: number;
    maxThreshold?: number;
    steps: number;
  };
  result: PlotSimilarityConfusionMatrixResult;
};

const testCases: SimilarityFunctionPlotTestCase[] = [
  {
    datasetNumberOfRecords: 2,
    links: [[0, 1, 1]],
    func: {
      type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
      similarityThreshold: 'similarity',
    },
    params: {
      groundTruth: [[0, 1]],
      steps: 2,
    },
    result: [
      {
        threshold: 1,
        truePositives: 1,
        falsePositives: 0,
        falseNegatives: 0,
        trueNegatives: 0,
      },
      {
        threshold: 1,
        truePositives: 1,
        falsePositives: 0,
        falseNegatives: 0,
        trueNegatives: 0,
      },
    ],
  },
  {
    datasetNumberOfRecords: 2,
    links: [[0, 1, 1]],
    func: {
      type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
      similarityThreshold: 'similarity',
    },
    params: {
      groundTruth: [[0, 1]],
      steps: 2,
      maxThreshold: 100,
      minThreshold: -100,
    },
    result: [
      {
        threshold: 100,
        truePositives: 0,
        falsePositives: 0,
        falseNegatives: 1,
        trueNegatives: 0,
      },
      {
        threshold: -100,
        truePositives: 1,
        falsePositives: 0,
        falseNegatives: 0,
        trueNegatives: 0,
      },
    ],
  },
  {
    datasetNumberOfRecords: 4,
    links: [
      [0, 1, 2],
      [2, 3, 1],
      [0, 2, 0],
    ],
    func: {
      type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
      similarityThreshold: 'similarity',
    },
    params: {
      groundTruth: [
        [0, 1],
        [2, 3],
      ],
      steps: 5,
    },
    result: [
      {
        threshold: 2,
        truePositives: 1,
        falsePositives: 0,
        falseNegatives: 1,
        trueNegatives: 4,
      },
      {
        threshold: 1.5,
        truePositives: 1,
        falsePositives: 0,
        falseNegatives: 1,
        trueNegatives: 4,
      },
      {
        threshold: 1,
        truePositives: 2,
        falsePositives: 0,
        falseNegatives: 0,
        trueNegatives: 4,
      },
      {
        threshold: 0.5,
        truePositives: 2,
        falsePositives: 0,
        falseNegatives: 0,
        trueNegatives: 4,
      },
      {
        threshold: 0,
        truePositives: 2,
        falsePositives: 4,
        falseNegatives: 0,
        trueNegatives: 0,
      },
    ],
  },
  {
    datasetNumberOfRecords: 3,
    links: [
      [0, 1, 2],
      [0, 2, 1],
    ],
    func: {
      type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
      similarityThreshold: 'similarity',
    },
    params: {
      groundTruth: [[0, 1], [2]],
      steps: 1,
    },
    result: [
      {
        threshold: 2,
        truePositives: 1,
        falsePositives: 0,
        falseNegatives: 0,
        trueNegatives: 2,
      },
    ],
  },
  {
    datasetNumberOfRecords: 3,
    links: [
      [0, 1, 2],
      [0, 2, 1],
    ],
    func: {
      type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
      similarityThreshold: 'similarity',
    },
    params: {
      groundTruth: [[0, 1], [2]],
      steps: 2,
    },
    result: [
      {
        threshold: 2,
        truePositives: 1,
        falsePositives: 0,
        falseNegatives: 0,
        trueNegatives: 2,
      },
      {
        threshold: 1,
        truePositives: 1,
        falsePositives: 2,
        falseNegatives: 0,
        trueNegatives: 0,
      },
    ],
  },
  {
    datasetNumberOfRecords: 2,
    links: [],
    func: {
      type: SimilarityThresholdFunctionValuesTypeEnum.Constant,
      constant: 0,
    },
    params: {
      groundTruth: [[0, 1]],
      steps: 1,
    },
    result: [
      {
        threshold: 0,
        truePositives: 0,
        falsePositives: 0,
        falseNegatives: 1,
        trueNegatives: 0,
      },
    ],
  },
];

describe.each<SimilarityFunctionPlotTestCase>(testCases)(
  'similarity function plot',
  ({ func, links, params: { groundTruth, ...params }, result }) => {
    let datasetId: DatasetId;
    let groundTruthId: ExperimentId;
    let experimentId: ExperimentId;
    let funcId: SimilarityThresholdFunctionId;
    beforeAll(async () => {
      await setupDatabase({
        loadExampleEntries: false,
        temporary: true,
      });
      [[groundTruthId], datasetId] = await loadTestCase([groundTruth]);
      experimentId = providers.experiment.addExperiment({
        algorithmId: providers.algorithm.addAlgorithm({ name: '' }),
        datasetId,
        name: '',
      });
      await providers.experiment.setExperimentFile(
        experimentId,
        SetExperimentFileFormatEnum.Pilot,
        fileToReadable([
          ['p1', 'p2', 'similarity'],
          ...links.map((link) => link.map((entry) => `${entry}`)),
        ])
      );
      funcId = providers.similarityThresholds.addSimilarityThresholdFunction({
        experimentId,
        similarityThresholdFunction: func,
      });
    });

    test('calculates correct result', () => {
      const received = plotSimilarityConfusionMatrix({
        datasetId,
        experimentId,
        func: funcId,
        groundTruth: [groundTruthId],
        ...params,
      });
      expect(received).toEqual(result);
    });

    test('calculates correct result multiple times (->modular clustering reset works)', () => {
      for (let index = 0; index < 2; ++index) {
        const received = plotSimilarityConfusionMatrix({
          datasetId,
          experimentId,
          func: funcId,
          groundTruth: [groundTruthId],
          ...params,
        });
        expect(received).toEqual(result);
      }
    });

    test('calculates correct metrics', () => {
      if (
        params.maxThreshold === undefined &&
        params.minThreshold === undefined
      ) {
        const received = plot({
          datasetId,
          experimentId,
          func: funcId,
          groundTruth: [groundTruthId],
          steps: params.steps,
          X: 'similarity',
          Y: Precision,
        });
        expect(received).toEqual(
          result
            .map(
              ({ threshold, ...matrix }) =>
                ({
                  threshold,
                  x: threshold,
                  y: new Precision(matrix).value,
                } as PlotResult[number])
            )
            .reverse()
        );
      }
    });
  }
);
