import { setupDatabase, tables } from '../../database';
import {
  AlgorithmId,
  DatasetId,
  ExperimentId,
  FileResponse,
  SetExperimentFileFormatEnum,
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionId,
  SimilarityThresholdFunctionOperatorOperatorEnum,
  SimilarityThresholdFunctionTypeEnum,
  SimilarityThresholdFunctionValues,
  SimilarityThresholdFunctionValuesTypeEnum,
} from '../../server/types';
import { fileToReadable } from '../../tools/test/filtToReadable';
import { providers } from '..';
import { expectClusteringsToEqual } from '../benchmark/cluster/test/utility';
import { IntersectionCache } from '../benchmark/intersection';
import { assertFilesMatch } from '../dataset/test/assertFilesMatch';

const numberOfRecords = 5;

describe('Similarity Threshold Provider', () => {
  let algorithmId: AlgorithmId;
  let datasetId: DatasetId;
  let experimentId: ExperimentId;
  let addedFunctions: SimilarityThresholdFunction[];
  function addFunctions(functions: SimilarityThresholdFunction[]) {
    const functionIds: SimilarityThresholdFunctionId[] = [];
    for (const addedFunction of functions) {
      const id = providers.similarityThresholds.addSimilarityThresholdFunction({
        experimentId,
        similarityThresholdFunction: (addedFunction as unknown) as SimilarityThresholdFunctionValues,
      });
      addedFunction.id = id;
      functionIds.push(id);
    }
    return functionIds;
  }

  beforeEach(async () => {
    await setupDatabase({ temporary: true, loadExampleEntries: false });
    algorithmId = providers.algorithm.addAlgorithm({
      name: '',
    });
    datasetId = providers.dataset.addDataset({
      name: '',
      numberOfRecords,
    });
    await providers.dataset.setDatasetFile(
      datasetId,
      fileToReadable([
        ['id'],
        ...new Array(numberOfRecords)
          .fill(0)
          .map((_, index) => [index.toString()]),
      ]),
      'id',
      '"',
      "'",
      ','
    );
    experimentId = providers.experiment.addExperiment({
      algorithmId,
      datasetId,
      name: '',
    });
    await providers.experiment.setExperimentFile(
      experimentId,
      SetExperimentFileFormatEnum.Pilot,
      fileToReadable([
        ['p1', 'p2', 'sim1', 'sim2'],
        ['0', '1', '1', '3'],
        ['1', '2', '2', '2'],
        ['2', '3', '3', '1'],
      ])
    );
    addedFunctions = [
      {
        id: experimentId,
        type: SimilarityThresholdFunctionTypeEnum.SimilarityThreshold,
        similarityThreshold: 'sim1',
      },
      {
        id: experimentId,
        type: SimilarityThresholdFunctionTypeEnum.Operator,
        operator: {
          left: {
            type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
            similarityThreshold: 'sim1',
          },
          operator: SimilarityThresholdFunctionOperatorOperatorEnum.Add,
          right: {
            type: SimilarityThresholdFunctionValuesTypeEnum.Operator,
            operator: {
              left: {
                type: SimilarityThresholdFunctionValuesTypeEnum.Operator,
                operator: {
                  left: {
                    type:
                      SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
                    similarityThreshold: 'sim2',
                  },
                  operator:
                    SimilarityThresholdFunctionOperatorOperatorEnum.Multiply,
                  right: {
                    type:
                      SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
                    similarityThreshold: 'sim2',
                  },
                },
              },
              operator: SimilarityThresholdFunctionOperatorOperatorEnum.Divide,
              right: {
                type:
                  SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
                similarityThreshold: 'sim1',
              },
            },
          },
        },
      },
    ];
  });

  test('list lists functions', () => {
    expect(
      providers.similarityThresholds.getSimilarityThresholdFunctions({
        experimentId,
      }).length
    ).toBe(0);
    addFunctions(addedFunctions);
    expect(new Set(addedFunctions)).toEqual(
      new Set(
        providers.similarityThresholds.getSimilarityThresholdFunctions({
          experimentId,
        })
      )
    );
  });

  test('add adds functions (and get gets functions)', () => {
    expect(
      providers.similarityThresholds.getSimilarityThresholdFunctions({
        experimentId,
      }).length
    ).toBe(0);
    const [functionId] = addFunctions([addedFunctions[1]]);
    expect(
      providers.similarityThresholds.getSimilarityThresholdFunction({
        experimentId,
        functionId,
      })
    ).toEqual(addedFunctions[1]);
  });

  test('delete deletes functions', () => {
    const [id1, id2] = addFunctions(addedFunctions);
    providers.similarityThresholds.deleteSimilarityThresholdFunction({
      experimentId,
      functionId: id1,
    });
    expect(() =>
      providers.similarityThresholds.getSimilarityThresholdFunction({
        experimentId,
        functionId: id1,
      })
    ).toThrowError();
    expect(() =>
      providers.similarityThresholds.getSimilarityThresholdFunction({
        experimentId,
        functionId: id2,
      })
    ).not.toThrowError();
  });

  test('set sets function', () => {
    const [id1] = addFunctions(addedFunctions);
    providers.similarityThresholds.setSimilarityThresholdFunction({
      experimentId,
      functionId: id1,
      similarityThresholdFunction: {
        type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
        similarityThreshold: 'sim2',
      },
    });
    expect(
      providers.similarityThresholds.getSimilarityThresholdFunction({
        experimentId,
        functionId: id1,
      })
    ).not.toEqual(addedFunctions[0]);
    expect(
      providers.similarityThresholds.getSimilarityThresholdFunction({
        experimentId,
        functionId: id1,
      })
    ).toEqual<SimilarityThresholdFunction>({
      id: id1,
      type: SimilarityThresholdFunctionTypeEnum.SimilarityThreshold,
      similarityThreshold: 'sim2',
    });
  });

  test('throws error on non existent similarity threshold', () => {
    expect(() =>
      providers.similarityThresholds.addSimilarityThresholdFunction({
        experimentId,
        similarityThresholdFunction: {
          type: SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
          similarityThreshold: 'nonExistentSimilarityThreshold',
        },
      })
    ).toThrowError();
  });

  test('deleting experiment deletes similarity thresholds', () => {
    addFunctions(addedFunctions);
    providers.experiment.deleteExperiment(experimentId);
    expect(
      tables.meta.similarityfunction.all({ experiment: experimentId }).length
    ).toBe(0);
  });

  function fileResponseToFile(fileResponse: FileResponse): string[][] {
    return [fileResponse.header, ...fileResponse.data].map((vals) =>
      vals.map((val) => val.toString())
    );
  }

  test('function impacts experiment', () => {
    const [functionId] = addFunctions([
      {
        id: 0,
        type: SimilarityThresholdFunctionTypeEnum.SimilarityThreshold,
        similarityThreshold: 'sim1',
      },
    ]);
    assertFilesMatch(
      fileResponseToFile(
        providers.experiment.getExperimentFile({ experimentId })
      ),
      [
        ['id1', 'id2', 'isDuplicate', 'sim1', 'sim2'],
        ['0', '1', '1', '1', '3'],
        ['1', '2', '1', '2', '2'],
        ['2', '3', '1', '3', '1'],
      ]
    );
    assertFilesMatch(
      fileResponseToFile(
        providers.experiment.getExperimentFile({
          experimentId,
          similarityThreshold: 1,
          similarityThresholdFunction: functionId,
        })
      ),
      [
        ['id1', 'id2', 'isDuplicate', 'sim1', 'sim2'],
        ['0', '1', '1', '1', '3'],
        ['1', '2', '1', '2', '2'],
        ['2', '3', '1', '3', '1'],
      ]
    );
    assertFilesMatch(
      fileResponseToFile(
        providers.experiment.getExperimentFile({
          experimentId,
          similarityThreshold: 2,
          similarityThresholdFunction: functionId,
        })
      ),
      [
        ['id1', 'id2', 'isDuplicate', 'sim1', 'sim2'],
        ['0', '1', '1', '1', '3'],
        ['1', '2', '1', '2', '2'],
      ]
    );
    assertFilesMatch(
      fileResponseToFile(
        providers.experiment.getExperimentFile({
          experimentId,
          similarityThreshold: 3,
          similarityThresholdFunction: functionId,
        })
      ),
      [
        ['id1', 'id2', 'isDuplicate', 'sim1', 'sim2'],
        ['0', '1', '1', '1', '3'],
      ]
    );
  });

  test('function impacts intersection', () => {
    const [functionId] = addFunctions([
      {
        id: 0,
        type: SimilarityThresholdFunctionTypeEnum.SimilarityThreshold,
        similarityThreshold: 'sim1',
      },
    ]);
    expectClusteringsToEqual(
      IntersectionCache.get(
        [experimentId],
        [],
        [datasetId],
        [undefined],
        [undefined],
        [],
        []
      ).clustering,
      [[0, 1, 2, 3], [4]]
    );
    expectClusteringsToEqual(
      IntersectionCache.get(
        [experimentId],
        [],
        [datasetId],
        [3],
        [functionId],
        [],
        []
      ).clustering,
      [[0], [1], [2, 3], [4]]
    );
    expectClusteringsToEqual(
      IntersectionCache.get(
        [experimentId],
        [],
        [datasetId],
        [2],
        [functionId],
        [],
        []
      ).clustering,
      [[0], [1, 2, 3], [4]]
    );
    expectClusteringsToEqual(
      IntersectionCache.get(
        [experimentId],
        [],
        [datasetId],
        [1],
        [functionId],
        [],
        []
      ).clustering,
      [[0, 1, 2, 3], [4]]
    );
  });
});
