import { dirSync } from 'tmp';

import { providers } from '../../providers';
import { tableSchemas } from '../schemas';
import { tables } from '../tables';
import { InsertColumnValues } from '../tools/types';
import { setupDatabase } from './setup';

const addedAlgorithm: InsertColumnValues<
  typeof tableSchemas['meta']['algorithm']['columns']
> = {
  name: 'UNIQUE_NAME',
  description: 'UNIQUE_DESCRIPTION',
  id: -12,
};

describe('database setup', () => {
  let appPath: string;
  let prebuiltPath: string;
  beforeEach(async () => {
    appPath = dirSync({ unsafeCleanup: true }).name;
    prebuiltPath = dirSync().name;
    await setupDatabase({
      appPath: prebuiltPath,
      loadExampleEntries: false,
      temporary: false,
      usePreBuiltDatabase: false,
    });
    tables.meta.algorithm.upsert([addedAlgorithm]);
  });
  test('imports prebuilt database', async () => {
    await setupDatabase({
      appPath,
      prebuiltAppPath: prebuiltPath,
      loadExampleEntries: false,
      temporary: false,
      usePreBuiltDatabase: true,
    });
    expect(providers.algorithm.listAlgorithms()).toMatchObject([
      addedAlgorithm,
    ]);
  });

  test('does not import prebuilt database if not specified', async () => {
    await setupDatabase({
      appPath,
      prebuiltAppPath: prebuiltPath,
      loadExampleEntries: false,
      temporary: false,
      usePreBuiltDatabase: false,
    });
    expect(providers.algorithm.listAlgorithms()).toMatchObject([]);
  });
});
