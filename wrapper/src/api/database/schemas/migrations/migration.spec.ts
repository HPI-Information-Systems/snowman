import { setupDatabase } from '../../setup';
import { loadOrCreateMainDatabase } from '../../setup/backend';
import { latest } from '.';
import { SchemaVersion } from './schemaVersion';

abstract class TestSchemaVersion extends SchemaVersion {
  abstract predecessor?: TestSchemaVersion;
  migrated = false;
  protected migrateFromLastVersion(): void {
    this.migrated = true;
  }
  reset() {
    this.migrated = false;
    this.predecessor?.reset();
  }
}

const TestSchemaV0 = new (class extends TestSchemaVersion {
  version = 0;
  predecessor = undefined;
})();
const TestSchemaV1 = new (class extends TestSchemaVersion {
  version = 1;
  predecessor = TestSchemaV0;
})();
const TestSchemaV2 = new (class extends TestSchemaVersion {
  version = 2;
  predecessor = TestSchemaV1;
})();

describe('SchemaVersion', () => {
  beforeEach(() => {
    loadOrCreateMainDatabase(true);
    TestSchemaV2.reset();
  });
  describe('migrates correctly', () => {
    test('from v0', () => {
      TestSchemaV2.migrate(0);
      expect(TestSchemaV0.migrated).toBeFalsy();
      expect(TestSchemaV1.migrated).toBeTruthy();
      expect(TestSchemaV2.migrated).toBeTruthy();
    });
    test('from v1', () => {
      TestSchemaV2.migrate(1);
      expect(TestSchemaV0.migrated).toBeFalsy();
      expect(TestSchemaV1.migrated).toBeFalsy();
      expect(TestSchemaV2.migrated).toBeTruthy();
    });
    test('from v2', () => {
      TestSchemaV2.migrate(2);
      expect(TestSchemaV0.migrated).toBeFalsy();
      expect(TestSchemaV1.migrated).toBeFalsy();
      expect(TestSchemaV2.migrated).toBeFalsy();
    });
  });
  describe('version stored correctly', () => {
    test('initial version is 0', () => {
      expect(TestSchemaVersion.getInstalledVersion()).toEqual(0);
    });
    test('keeps version 0', () => {
      TestSchemaV0.migrate(TestSchemaVersion.getInstalledVersion());
      expect(TestSchemaVersion.getInstalledVersion()).toEqual(
        TestSchemaV0.version
      );
    });
    test('updates to version 1', () => {
      TestSchemaV1.migrate(TestSchemaVersion.getInstalledVersion());
      expect(TestSchemaVersion.getInstalledVersion()).toEqual(
        TestSchemaV1.version
      );
    });
    test('updates to version 2', () => {
      TestSchemaV2.migrate(TestSchemaVersion.getInstalledVersion());
      expect(TestSchemaVersion.getInstalledVersion()).toEqual(
        TestSchemaV2.version
      );
    });
  });
  test('throws error when cannot upgrade from version', () => {
    expect(() => TestSchemaV0.migrate(TestSchemaV2.version)).toThrowError();
  });
});

describe('database setup', () => {
  beforeEach(async () => {
    await setupDatabase({
      temporary: true,
      loadExampleEntries: false,
    });
  });
  test('sets latest database version', () => {
    expect(SchemaVersion.getInstalledVersion()).toEqual(latest.version);
  });
});
