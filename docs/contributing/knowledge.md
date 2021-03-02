# Contributing Knowledge

This document contains information about how to extend the codebase in specific cases. For general contributing guidelines see [here](https://github.com/HPI-Information-Systems/snowman#Contributing).

## Adding new experiment formats

1. subclass [`ExperimentInserter`](https://github.com/HPI-Information-Systems/snowman/blob/5f9ea889c3e2b273e6da3c584eb7baae438e6683/wrapper/src/api/providers/experiment/experimentProvider/file/experimentInserter.ts) and overwrite the abstract methods
   - add duplicates via [`addDuplicate`](https://github.com/HPI-Information-Systems/snowman/blob/5f9ea889c3e2b273e6da3c584eb7baae438e6683/wrapper/src/api/providers/experiment/experimentProvider/file/experimentInserter.ts#L38)
   - we also provide a [`CSVInserter`](https://github.com/HPI-Information-Systems/snowman/blob/5f9ea889c3e2b273e6da3c584eb7baae438e6683/wrapper/src/api/providers/experiment/experimentProvider/file/csvInserter.ts) which can be subclassed for csv experiment formats
2. give the format a unique name and register it with the server by adding it to [this](https://github.com/HPI-Information-Systems/snowman/blob/5f9ea889c3e2b273e6da3c584eb7baae438e6683/wrapper/src/api/providers/experiment/experimentProvider/file/index.ts#L16) map.
3. add the format to the [api specification](https://github.com/HPI-Information-Systems/snowman/blob/5f9ea889c3e2b273e6da3c584eb7baae438e6683/docs/api_specification.yaml#L452-L455) (**under docs**)
4. regenerate the client api and generated api specification
   - the server types do not need to be updated

## Updating the database schema

1. create a folder for the new version in `api/database/schemas` named like `v1`
2. copy all files from the previous version
3. make necessary changes
4. edit the `migration.ts` file and update `version`, `successor` and `migrateFromLastVersion`
   - make sure the `version` is unique
   - `migrateFromLastVersion` contains the migration logic
5. update `api/database/schemas/index.ts` and export the new version as `latest`
