import { setupDatabase, tables } from '../../database';
import {
  AlgorithmValues,
  AlgorithmValuesSoftKPIsGeneralInputFormatEnum,
  AlgorithmValuesSoftKPIsGeneralInterfaceEnum,
  AlgorithmValuesSoftKPIsGeneralUseCaseEnum,
  AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsInstallationCostsOsEnum,
  AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
  DatasetValues,
  ExperimentValues,
  ExperimentValuesSoftKPIsImplementationKnowHowLevelEnum,
} from '../../server/types';
import { fileToReadable } from '../../tools/test/filtToReadable';
import { AlgorithmProvider } from '../algorithm/algorithmProvider';
import { DatasetProvider } from '../dataset/datasetProvider';
import { ExperimentProvider } from './experimentProvider/experimentProvider';

describe('ExperimentProvider', () => {
  let provider: ExperimentProvider;

  const addedDatasets: { meta: DatasetValues; file?: string[][] }[] = [
    {
      meta: {
        description: 'No Dataset',
        name: 'No Dataset',
        numberOfRecords: 100,
        tags: [],
      },
    },
    {
      meta: {
        description: 'Dataset',
        name: 'Dataset',
        tags: [],
        numberOfRecords: undefined,
      },
      file: [
        ['id', 'column1', 'column2'],
        ['id1', 'val11', 'val12'],
        ['id2', 'val21', 'val22'],
      ],
    },
  ];
  let addedDatasetIds: number[];
  const addedAlgorithm: AlgorithmValues = {
    description: 'Algorithm',
    name: 'Algorithm',
    softKPIs: {
      general: {
        matchingSolutionType:
          AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum.Ml,
        costs: 300,
        useCase: [
          AlgorithmValuesSoftKPIsGeneralUseCaseEnum.Deduplicate,
          AlgorithmValuesSoftKPIsGeneralUseCaseEnum.Merge,
        ],
        inputFormat: [AlgorithmValuesSoftKPIsGeneralInputFormatEnum.Csv],
        _interface: [
          AlgorithmValuesSoftKPIsGeneralInterfaceEnum.Cli,
          AlgorithmValuesSoftKPIsGeneralInterfaceEnum.Gui,
        ],
      },
      installationCosts: {
        implementationKnowHowLevel:
          AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum.Starter,
        timeToInstall: 3,
        os: [
          AlgorithmValuesSoftKPIsInstallationCostsOsEnum.Linux,
          AlgorithmValuesSoftKPIsInstallationCostsOsEnum.MacOs,
          AlgorithmValuesSoftKPIsInstallationCostsOsEnum.Windows,
        ],
      },
    },
  };
  let addedAlgorithmId: number;

  let addedExperiments: {
    meta: ExperimentValues;
    file?: string[][];
    numberOfUploadedRecords?: number;
  }[];
  let addedExperimentIds: number[];

  function addAlgorithm(): void {
    addedAlgorithmId = new AlgorithmProvider().addAlgorithm(addedAlgorithm);
  }

  async function addDatasets(): Promise<void> {
    const datasetProvider = new DatasetProvider();
    addedDatasetIds = [];
    for (const dataset of addedDatasets) {
      const id = datasetProvider.addDataset(dataset.meta);
      addedDatasetIds.push(id);
      if (dataset.file) {
        await datasetProvider.setDatasetFile(
          id,
          fileToReadable(dataset.file),
          'id',
          '"',
          "'",
          ','
        );
      }
    }
  }

  async function addExperiments(): Promise<void> {
    addedExperiments = [
      {
        meta: {
          algorithmId: addedAlgorithmId,
          datasetId: addedDatasetIds[0],
          description: 'No dataset file',
          name: 'No dataset file',
          softKPIs: {
            timeToConfigure: 4,
            implementationKnowHowLevel:
              ExperimentValuesSoftKPIsImplementationKnowHowLevelEnum.Intermediate,
          },
        },
      },
      {
        meta: {
          algorithmId: addedAlgorithmId,
          datasetId: addedDatasetIds[1],
          description: 'Dataset file',
          name: 'Dataset file',
          softKPIs: {
            timeToConfigure: 5,
            implementationKnowHowLevel:
              ExperimentValuesSoftKPIsImplementationKnowHowLevelEnum.Starter,
          },
        },
        file: [
          ['p1', 'p2'],
          ['id1', 'id2'],
        ],
        numberOfUploadedRecords: 1,
      },
    ];
    addedExperimentIds = [];
    for (const experiment of addedExperiments) {
      const id = provider.addExperiment(experiment.meta);
      addedExperimentIds.push(id);
      if (experiment.file) {
        await provider.setExperimentFile(
          id,
          'pilot',
          fileToReadable(experiment.file)
        );
      }
    }
  }

  beforeEach(async () => {
    await setupDatabase({ temporary: true, loadExampleEntries: false });
    provider = new ExperimentProvider();
    addAlgorithm();
    await addDatasets();
    await addExperiments();
  });

  test('list lists experiments', () => {
    expect(new Set(provider.listExperiments())).toMatchObject(
      new Set(
        addedExperiments.map((experiment, index) => {
          return {
            ...experiment.meta,
            id: addedExperimentIds[index],
            numberOfUploadedRecords:
              addedExperiments[index].numberOfUploadedRecords,
          };
        })
      )
    );
  });

  test('add adds experiment', () => {
    const addedExperiment: ExperimentValues = {
      algorithmId: addedAlgorithmId,
      datasetId: addedDatasetIds[0],
      description: 'Another one',
      name: 'Another Name',
      softKPIs: {
        timeToConfigure: 5,
        implementationKnowHowLevel:
          ExperimentValuesSoftKPIsImplementationKnowHowLevelEnum.Starter,
      },
    };
    const id = provider.addExperiment(addedExperiment);
    expect(provider.getExperiment(id)).toMatchObject({
      id,
      ...addedExperiment,
    });
  });

  test('get returns experiment', () => {
    expect(provider.getExperiment(addedExperimentIds[0])).toMatchObject({
      id: addedExperimentIds[0],
      ...addedExperiments[0].meta,
      numberOfUploadedRecords: addedExperiments[0].numberOfUploadedRecords,
    });
  });

  test('get throws error if not existent', () => {
    const notUsedId = addedExperimentIds.reduce((prev, val) => prev + val, 1);
    expect(() => provider.getExperiment(notUsedId)).toThrowError();
  });

  test('set sets experiment', () => {
    const updatedExperiment: ExperimentValues = {
      algorithmId: addedAlgorithmId,
      datasetId: addedDatasetIds[0],
      description: ' A new description',
      name: 'A neeew name',
      softKPIs: {
        timeToConfigure: 6,
        implementationKnowHowLevel:
          ExperimentValuesSoftKPIsImplementationKnowHowLevelEnum.Expert,
      },
    };
    provider.setExperiment(addedExperimentIds[0], updatedExperiment);
    expect(provider.getExperiment(addedExperimentIds[0])).toMatchObject({
      ...updatedExperiment,
      id: addedExperimentIds[0],
      numberOfUploadedRecords: addedExperiments[0].numberOfUploadedRecords,
    });
  });

  test('delete deletes experiment', () => {
    expect(() =>
      provider.getExperiment(addedExperimentIds[0])
    ).not.toThrowError();
    provider.deleteExperiment(addedExperimentIds[0]);
    expect(() => provider.getExperiment(addedExperimentIds[0])).toThrowError();
  });

  test('set file sets file', async () => {
    expect(tables.experiment.experiment(addedExperimentIds[0]).exists()).toBe(
      false
    );
    const file = [
      ['p1', 'p2'],
      ['id1', 'id1'],
    ];
    await provider.setExperimentFile(
      addedExperimentIds[0],
      'pilot',
      fileToReadable(file)
    );
    expect(tables.experiment.experiment(addedExperimentIds[0]).exists()).toBe(
      true
    );
  });

  test('delete file deletes file', () => {
    expect(tables.experiment.experiment(addedExperimentIds[1]).exists()).toBe(
      true
    );
    provider.deleteExperimentFile(addedExperimentIds[1]);
    expect(tables.experiment.experiment(addedExperimentIds[1]).exists()).toBe(
      false
    );
  });

  test('set file throws error when adding unknown / too many ids', async () => {
    const file = [
      ['p1', 'p2'],
      ['unknown id1', 'unknown id2'],
    ];
    await expect(
      async () =>
        await provider.setExperimentFile(
          addedExperimentIds[1],
          'pilot',
          fileToReadable(file)
        )
    ).rejects.toThrowError();
    expect(() =>
      provider.getExperimentFile(addedExperimentIds[1])
    ).toThrowError();
  });
});
