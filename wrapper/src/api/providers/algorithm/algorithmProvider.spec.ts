import { setupDatabase } from '../../database';
import {
  AlgorithmId,
  AlgorithmValues,
  AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
} from '../../server/types';
import { DatasetProvider } from '../dataset/datasetProvider';
import { ExperimentProvider } from '../experiment/experimentProvider';
import { AlgorithmProvider } from './algorithmProvider';

describe('AlgorithmProvider', () => {
  let provider: AlgorithmProvider;
  const addedAlgorithms: AlgorithmValues[] = [
    {
      description: 'Mock 1',
      name: 'Mock 1',
      softKPIs: {
        timeToConfigure: 1,
        timeToInstall: 2,
        implementationKnowHowLevel:
          AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum.Starter,
        matchingSolutionType:
          AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum.Ml,
      },
    },
    {
      description: 'Mock 2',
      name: 'Mock 2',
      softKPIs: {
        timeToConfigure: 3,
        timeToInstall: 4,
        implementationKnowHowLevel:
          AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum.Starter,
        matchingSolutionType:
          AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum.Ml,
      },
    },
  ];
  let addedAlgorithmids: AlgorithmId[];

  beforeEach(async () => {
    await setupDatabase({ temporary: true, loadExampleEntries: false });
    provider = new AlgorithmProvider();
    addedAlgorithmids = [];
    for (const algorithm of addedAlgorithms) {
      addedAlgorithmids.push(provider.addAlgorithm(algorithm));
    }
  });

  test('list lists all algorithms', () => {
    expect(new Set(provider.listAlgorithms())).toMatchObject(
      new Set(
        addedAlgorithms.map((algorithm, index) => {
          return { ...algorithm, id: addedAlgorithmids[index] };
        })
      )
    );
  });

  test('add adds an algorithm', () => {
    const priorAlgorithmsCount = provider.listAlgorithms().length;
    const addedAlgorithm: AlgorithmValues = {
      description: 'Added Algorithm',
      name: 'Added Algorithm',
      softKPIs: {
        timeToConfigure: 5,
        timeToInstall: 6,
        matchingSolutionType:
          AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum.Other,
        implementationKnowHowLevel:
          AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum.Intermediate,
      },
    };
    const addedAlgorithmId = provider.addAlgorithm(addedAlgorithm);
    const newAlgorithmsCount = provider.listAlgorithms().length;

    expect(priorAlgorithmsCount + 1).toEqual(newAlgorithmsCount);
    expect(provider.getAlgorithm(addedAlgorithmId)).toMatchObject({
      ...addedAlgorithm,
      id: addedAlgorithmId,
    });
  });

  test('get returns algorithm', () => {
    for (let index = 0; index < addedAlgorithms.length; index++) {
      expect(provider.getAlgorithm(addedAlgorithmids[index])).toMatchObject({
        ...addedAlgorithms[index],
        id: addedAlgorithmids[index],
      });
    }
  });

  test('set updates an algorithm', () => {
    const setAlgorithmValues: AlgorithmValues = {
      name: 'Not Mock 1',
      description: 'Not Mock 1',
      softKPIs: {
        timeToConfigure: 7,
        timeToInstall: 8,
        matchingSolutionType:
          AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum.Other,
        implementationKnowHowLevel:
          AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum.Starter,
      },
    };
    provider.setAlgorithm(addedAlgorithmids[0], setAlgorithmValues);
    expect(provider.getAlgorithm(addedAlgorithmids[0])).toEqual({
      ...setAlgorithmValues,
      id: addedAlgorithmids[0],
    });
  });

  test('delete deletes an algorithm', () => {
    const priorCount = provider.listAlgorithms().length;
    provider.deleteAlgorithm(addedAlgorithmids[0]);
    const newCount = provider.listAlgorithms().length;
    expect(priorCount - 1).toEqual(newCount);
    expect(
      provider
        .listAlgorithms()
        .findIndex((alg) => alg.id === addedAlgorithmids[0])
    ).toEqual(-1);
  });

  test('delete throws if algorithm is used', () => {
    const experimentProvider = new ExperimentProvider();
    const datasetProvider = new DatasetProvider();
    const datasetId = datasetProvider.addDataset({
      description: 'Dataset Description',
      name: 'Dataset Name',
      tags: [],
      numberOfRecords: 5,
    });
    experimentProvider.addExperiment({
      algorithmId: addedAlgorithmids[0],
      datasetId,
      description: 'Experiment Description',
      name: 'Experiment Name',
      softKPIs: {
        timeToConfigure: 3,
      },
    });
    expect(() => provider.deleteAlgorithm(addedAlgorithmids[0])).toThrow();
  });
});
