import { setupDatabase, tables } from '../../database';
import {
  AlgorithmId,
  DatasetId,
  ExperimentId,
  SetExperimentFileFormatEnum,
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionId,
  SimilarityThresholdFunctionTypeEnum,
  SimilarityThresholdFunctionValues,
  SimilarityThresholdFunctionValuesTypeEnum,
  SimilarityThresholdOperatorOperatorEnum,
} from '../../server/types';
import { fileToReadable } from '../../tools/test/filtToReadable';
import { providers } from '..';

const numberOfRecords = 20;

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
        ['0', '1', '1', '1'],
        ['1', '2', '2', '2'],
        ['2', '3', '3', '3'],
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
          operator: SimilarityThresholdOperatorOperatorEnum.Add,
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
                  operator: SimilarityThresholdOperatorOperatorEnum.Multiply,
                  right: {
                    type:
                      SimilarityThresholdFunctionValuesTypeEnum.SimilarityThreshold,
                    similarityThreshold: 'sim2',
                  },
                },
              },
              operator: SimilarityThresholdOperatorOperatorEnum.Divide,
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
});
