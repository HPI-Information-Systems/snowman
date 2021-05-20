import { setupDatabase, tables } from '../../database';
import {
  AlgorithmId,
  DatasetId,
  ExperimentId,
  FileResponse,
  SetExperimentFileFormatEnum,
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionId,
  SimilarityThresholdFunctionOperatorOperatorEnum,
  SimilarityThresholdFunctionUnaryOperatorOperatorEnum,
  SimilarityThresholdFunctionValues,
} from '../../server/types';
import { fileToReadable } from '../../tools/test/filtToReadable';
import { providers } from '..';
import { IntersectionCache } from '../benchmark/cache/flavors/intersectionCache';
import { expectClusteringsToEqual } from '../benchmark/cluster/test/utility';
import { IntersectionOnlyIncludes } from '../benchmark/intersection/intersectionOnlyIncludes';
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
        ['0', '3', '0', '0'],
      ])
    );
    addedFunctions = [
      {
        id: experimentId,
        experimentId: experimentId,
        definition: {
          type:
            SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
          similarityThreshold: 'sim1',
        },
        name: 'function1',
      },
      {
        id: experimentId,
        experimentId: experimentId,
        definition: {
          type: SimilarityThresholdFunctionDefinitionTypeEnum.Operator,

          operator: {
            left: {
              type:
                SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
              similarityThreshold: 'sim1',
            },
            operator: SimilarityThresholdFunctionOperatorOperatorEnum.Add,
            right: {
              type: SimilarityThresholdFunctionDefinitionTypeEnum.Operator,
              operator: {
                left: {
                  type: SimilarityThresholdFunctionDefinitionTypeEnum.Operator,
                  operator: {
                    left: {
                      type:
                        SimilarityThresholdFunctionDefinitionTypeEnum.Constant,
                      constant: 0,
                    },
                    operator:
                      SimilarityThresholdFunctionOperatorOperatorEnum.Multiply,
                    right: {
                      type:
                        SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
                      similarityThreshold: 'sim2',
                    },
                  },
                },
                operator:
                  SimilarityThresholdFunctionOperatorOperatorEnum.Divide,
                right: {
                  type: SimilarityThresholdFunctionDefinitionTypeEnum.Constant,
                  constant: -22.2412,
                },
              },
            },
          },
        },
        name: 'function2',
      },
      {
        id: experimentId,
        experimentId: experimentId,
        definition: {
          type: SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator,
          unaryOperator: {
            func: {
              type:
                SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
              similarityThreshold: 'sim1',
            },
            operator: SimilarityThresholdFunctionUnaryOperatorOperatorEnum.Sqrt,
          },
        },
        name: 'function3',
      },
      {
        id: experimentId,
        experimentId: experimentId,
        definition: {
          type: SimilarityThresholdFunctionDefinitionTypeEnum.Operator,

          operator: {
            left: {
              type:
                SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
              similarityThreshold: 'sim1',
            },
            operator: SimilarityThresholdFunctionOperatorOperatorEnum.Add,
            right: {
              type: SimilarityThresholdFunctionDefinitionTypeEnum.Operator,
              operator: {
                left: {
                  type: SimilarityThresholdFunctionDefinitionTypeEnum.Operator,
                  operator: {
                    left: {
                      type:
                        SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator,
                      unaryOperator: {
                        func: {
                          type:
                            SimilarityThresholdFunctionDefinitionTypeEnum.Constant,
                          constant: 200,
                        },
                        operator:
                          SimilarityThresholdFunctionUnaryOperatorOperatorEnum.Ln,
                      },
                    },
                    operator:
                      SimilarityThresholdFunctionOperatorOperatorEnum.Power,
                    right: {
                      type:
                        SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
                      similarityThreshold: 'sim2',
                    },
                  },
                },
                operator: SimilarityThresholdFunctionOperatorOperatorEnum.Mod,
                right: {
                  type: SimilarityThresholdFunctionDefinitionTypeEnum.Constant,
                  constant: -22.2412,
                },
              },
            },
          },
        },
        name: 'function4',
      },
    ];
  });

  test('list lists functions', () => {
    const initialLength = providers.similarityThresholds.getSimilarityThresholdFunctions()
      .length;
    addFunctions(addedFunctions);

    expect(
      providers.similarityThresholds.getSimilarityThresholdFunctions().length
    ).toBe(initialLength + addedFunctions.length);
    expect(
      new Set(providers.similarityThresholds.getSimilarityThresholdFunctions())
    ).toEqual(expect.arrayContaining(addedFunctions));
  });

  test('add adds functions (and get gets functions)', () => {
    const [functionId] = addFunctions([addedFunctions[1]]);
    expect(
      providers.similarityThresholds.getSimilarityThresholdFunction({
        functionId,
      })
    ).toEqual(addedFunctions[1]);
  });

  test('delete deletes functions', () => {
    const [id1, id2] = addFunctions(addedFunctions);
    providers.similarityThresholds.deleteSimilarityThresholdFunction({
      functionId: id1,
    });
    expect(() =>
      providers.similarityThresholds.getSimilarityThresholdFunction({
        functionId: id1,
      })
    ).toThrowError();
    expect(() =>
      providers.similarityThresholds.getSimilarityThresholdFunction({
        functionId: id2,
      })
    ).not.toThrowError();
  });

  test('set sets function', () => {
    const [id1] = addFunctions(addedFunctions);
    providers.similarityThresholds.setSimilarityThresholdFunction({
      functionId: id1,
      similarityThresholdFunction: {
        definition: {
          similarityThreshold: 'sim2',
          type:
            SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
        },
        name: 'function4',
        experimentId,
      },
    });
    expect(
      providers.similarityThresholds.getSimilarityThresholdFunction({
        functionId: id1,
      })
    ).not.toEqual(addedFunctions[0]);
    expect(
      providers.similarityThresholds.getSimilarityThresholdFunction({
        functionId: id1,
      })
    ).toEqual<SimilarityThresholdFunction>({
      id: id1,
      name: 'function4',
      definition: {
        type: SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
        similarityThreshold: 'sim2',
      },
      experimentId,
    });
  });

  test('throws error on non existent similarity threshold', () => {
    expect(() =>
      providers.similarityThresholds.addSimilarityThresholdFunction({
        similarityThresholdFunction: {
          definition: {
            type:
              SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
            similarityThreshold: 'nonExistentSimilarityThreshold',
          },
          experimentId,
          name: 'functionX',
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
        name: 'function2',
        experimentId,
        definition: {
          similarityThreshold: 'sim1',
          type:
            SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
        },
      },
    ]);
    assertFilesMatch(
      fileResponseToFile(
        providers.experiment.getExperimentFile({ experimentId })
      ),
      [
        [
          'id1',
          'id2',
          'isDuplicate',
          'isDuplicateAndLinksUnlinkedNodes',
          'sim1',
          'sim2',
        ],
        ['0', '1', '1', '1', '1', '3'],
        ['1', '2', '1', '1', '2', '2'],
        ['2', '3', '1', '1', '3', '1'],
        ['0', '3', '1', '0', '0', '0'],
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
        ['id1', 'id2', 'similarity'],
        ['0', '1', '1'],
        ['1', '2', '2'],
        ['2', '3', '3'],
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
        ['id1', 'id2', 'similarity'],
        ['1', '2', '2'],
        ['2', '3', '3'],
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
        ['id1', 'id2', 'similarity'],
        ['2', '3', '3'],
      ]
    );
  });

  test('function impacts intersection', () => {
    const [functionId] = addFunctions([
      {
        id: 0,
        name: 'function3',
        experimentId,
        definition: {
          similarityThreshold: 'sim1',
          type:
            SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
        },
      },
    ]);
    expectClusteringsToEqual(
      (IntersectionCache.get({
        datasetId,
        excluded: [],
        included: [{ experimentId }],
      }) as IntersectionOnlyIncludes).clustering,
      [[0, 1, 2, 3], [4]]
    );
    expectClusteringsToEqual(
      (IntersectionCache.get({
        datasetId,
        excluded: [],
        included: [
          { experimentId, similarity: { func: functionId, threshold: 3 } },
        ],
      }) as IntersectionOnlyIncludes).clustering,
      [[0], [1], [2, 3], [4]]
    );
    expectClusteringsToEqual(
      (IntersectionCache.get({
        datasetId,
        excluded: [],
        included: [
          { experimentId, similarity: { func: functionId, threshold: 2 } },
        ],
      }) as IntersectionOnlyIncludes).clustering,
      [[0], [1, 2, 3], [4]]
    );
    expectClusteringsToEqual(
      (IntersectionCache.get({
        datasetId,
        excluded: [],
        included: [
          { experimentId, similarity: { func: functionId, threshold: 1 } },
        ],
      }) as IntersectionOnlyIncludes).clustering,
      [[0, 1, 2, 3], [4]]
    );
  });
});
