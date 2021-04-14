import { setupDatabase } from '../../database';
import { DatasetId, DatasetValues } from '../../server/types';
import { fileToReadable } from '../../tools/test/filtToReadable';
import { DatasetProvider } from './datasetProvider';
import { assertFilesMatch } from './test/assertFilesMatch';

describe('DatasetProvider', () => {
  let provider: DatasetProvider;
  const addedDatasets: { meta: DatasetValues; file?: string[][] }[] = [
    {
      meta: {
        description: 'Mock 1',
        name: 'Mock 1',
        numberOfRecords: 100,
        tags: ['this', 'is', 'a', 'tag', 'weird/tag-&%)?!<>|$!"#*+~'],
      },
    },
    {
      meta: {
        description: 'Mock 2',
        name: 'Mock 2',
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
  const addedDatasetsWithNumberOfRecords = addedDatasets.map((dataset) => {
    const result = { ...dataset };
    if (dataset.file) {
      result.meta = { ...result.meta };
      result.meta.numberOfRecords = dataset.file.length - 1;
    }
    return result;
  });
  let addedDatasetIds: DatasetId[];
  beforeEach(async () => {
    await setupDatabase({ temporary: true, loadExampleEntries: false });
    provider = new DatasetProvider();
    addedDatasetIds = [];
    for (const dataset of addedDatasets) {
      const datasetId = provider.addDataset(dataset.meta);
      addedDatasetIds.push(datasetId);
      if (dataset.file) {
        await provider.setDatasetFile(
          datasetId,
          fileToReadable(dataset.file),
          'id',
          '"',
          "'",
          ','
        );
      }
    }
  });

  test('list lists all datasets', () => {
    expect(new Set(provider.listDatasets())).toMatchObject(
      new Set(
        addedDatasetsWithNumberOfRecords.map((dataset, index) => {
          return {
            ...dataset.meta,
            id: addedDatasetIds[index],
            numberOfUploadedRecords:
              (addedDatasetsWithNumberOfRecords[index].file?.length ?? 1) - 1 ||
              undefined,
          };
        })
      )
    );
  });

  test('add adds a dataset', () => {
    const priorDatasetCount = provider.listDatasets().length;
    const addedDataset: DatasetValues = {
      description: 'Added Algorithm',
      name: 'Added Algorithm',
      tags: [],
      numberOfRecords: undefined,
    };
    const addedDatasetId = provider.addDataset(addedDataset);
    const newDatasetCount = provider.listDatasets().length;

    expect(priorDatasetCount + 1).toEqual(newDatasetCount);
    expect(provider.getDataset(addedDatasetId)).toMatchObject({
      ...addedDataset,
      id: addedDatasetId,
    });
    expect(() => provider.getDatasetFile(addedDatasetId, 0, 10)).toThrowError();
  });

  test('get returns dataset', () => {
    for (let index = 0; index < addedDatasets.length; index++) {
      expect(provider.getDataset(addedDatasetIds[index])).toMatchObject({
        ...addedDatasetsWithNumberOfRecords[index].meta,
        id: addedDatasetIds[index],
        numberOfUploadedRecords:
          (addedDatasetsWithNumberOfRecords[index].file?.length ?? 1) - 1 ||
          undefined,
      });
    }
  });

  test('set updates a dataset', () => {
    const setDatasetValues: DatasetValues = {
      name: 'Not Mock 1',
      description: 'Not Mock 1',
      tags: ['Not tags 1'],
      numberOfRecords: 20,
    };
    provider.setDataset(addedDatasetIds[0], setDatasetValues);
    expect(provider.getDataset(addedDatasetIds[0])).toEqual({
      ...setDatasetValues,
      id: addedDatasetIds[0],
      numberOfUploadedRecords:
        (addedDatasetsWithNumberOfRecords[0].file?.length ?? 1) - 1 ||
        undefined,
    });
  });

  test('delete deletes a dataset (including dataset file)', () => {
    const priorCount = provider.listDatasets().length;
    provider.deleteDataset(addedDatasetIds[1]);
    const newCount = provider.listDatasets().length;
    expect(priorCount - 1).toEqual(newCount);
    expect(
      provider
        .listDatasets()
        .findIndex((dataset) => dataset.id === addedDatasetIds[1])
    ).toEqual(-1);
    expect(() =>
      provider.getDatasetFile(addedDatasetIds[1], 0, 10000)
    ).toThrowError();
  });

  test('getFile returns file or throws error', () => {
    for (let index = 0; index < addedDatasets.length; index++) {
      const file = addedDatasets[index].file;
      if (file) {
        const readFile = provider.getDatasetFile(
          addedDatasetIds[index],
          0,
          100000
        );
        expect(() =>
          assertFilesMatch(file, [readFile.header, ...readFile.data])
        ).not.toThrowError();
      } else {
        // eslint-disable-next-line no-loop-func
        expect(() =>
          provider.getDatasetFile(addedDatasetIds[index], 0, 10)
        ).toThrowError();
      }
    }
  });

  test('setFile uploads file', async () => {
    const newFile = [
      ['id2', 'not column1', 'not column2'],
      ['id1', 'not val11', 'not val12'],
      ['id2', 'not val21', 'not val22'],
      ['id3', 'new', 'row'],
    ];
    await provider.setDatasetFile(
      addedDatasetIds[1],
      fileToReadable(newFile),
      'id2',
      '"',
      "'",
      ','
    );
    const readFile = provider.getDatasetFile(addedDatasetIds[1], 0, 100000);
    expect(() =>
      assertFilesMatch(newFile, [readFile.header, ...readFile.data])
    ).not.toThrowError();
  });

  test('setFile throws warning when row ids miss', async () => {
    const newFile = [
      ['id2', 'not column1', 'not column2'],
      ['id1', 'not val11', 'not val12'],
    ];
    expect(
      async () =>
        await provider.setDatasetFile(
          addedDatasetIds[1],
          fileToReadable(newFile),
          'id2',
          '"',
          "'",
          ','
        )
    ).rejects.toThrow();
  });
});
