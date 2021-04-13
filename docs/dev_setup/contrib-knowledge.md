# Contribution Knowledge

This document contains information about how to extend the codebase in specific cases. For general contributing guidelines see [here](https://github.com/HPI-Information-Systems/snowman#Contributing).

## Adding new experiment formats

1. subclass [`ExperimentInserter`](https://github.com/HPI-Information-Systems/snowman/blob/5f9ea889c3e2b273e6da3c584eb7baae438e6683/wrapper/src/api/providers/experiment/experimentProvider/file/experimentInserter.ts) and overwrite the abstract methods
   - add duplicates via [`addDuplicate`](https://github.com/HPI-Information-Systems/snowman/blob/5f9ea889c3e2b273e6da3c584eb7baae438e6683/wrapper/src/api/providers/experiment/experimentProvider/file/experimentInserter.ts#L38)
   - we also provide a [`CSVInserter`](https://github.com/HPI-Information-Systems/snowman/blob/5f9ea889c3e2b273e6da3c584eb7baae438e6683/wrapper/src/api/providers/experiment/experimentProvider/file/csvInserter.ts) which can be subclassed for csv experiment formats
2. give the format a unique name and register it with the server by adding it to [this](https://github.com/HPI-Information-Systems/snowman/blob/5f9ea889c3e2b273e6da3c584eb7baae438e6683/wrapper/src/api/providers/experiment/experimentProvider/file/index.ts#L16) map.
3. add the format to the [api specification](https://github.com/HPI-Information-Systems/snowman/blob/5f9ea889c3e2b273e6da3c584eb7baae438e6683/docs/api_specification.yaml#L452-L455) (**under docs**)
4. regenerate the types and generated api specification

## Updating the database schema

1. change the schema under [`api/database/schemas`](https://github.com/HPI-Information-Systems/snowman/tree/7a4e5c55a4b06eaaaa1a2c12f206a1a5b822ae75/wrapper/src/api/database/schemas) as required
2. create a migration script in [`api/database/schemas/migrations`](https://github.com/HPI-Information-Systems/snowman/tree/7a4e5c55a4b06eaaaa1a2c12f206a1a5b822ae75/wrapper/src/api/database/schemas/migrations) which **does not reference the schema** (as it might change in the future)
   - that means the changes should be "duplicated" here. See [`api/database/schemas/v3.ts`](https://github.com/HPI-Information-Systems/snowman/blob/b6b13a990a5c51b89be31ba6613abb8822be95e8/wrapper/src/api/database/schemas/migrations/v3.ts) as an example.
   - You can overwrite [`performResetAsMigration`](https://github.com/HPI-Information-Systems/snowman/blob/b6b13a990a5c51b89be31ba6613abb8822be95e8/wrapper/src/api/database/schemas/migrations/v1.ts#L8) if a migration is not possible and the database must be recreated.
3. update [`api/database/schemas/migrations/index.ts`](https://github.com/HPI-Information-Systems/snowman/blob/7a4e5c55a4b06eaaaa1a2c12f206a1a5b822ae75/wrapper/src/api/database/schemas/migrations/index.ts) and export the new version as `latest`

## Creating a release

1. update version numbers in [`./package.json`](https://github.com/HPI-Information-Systems/snowman/blob/b6b13a990a5c51b89be31ba6613abb8822be95e8/package.json#L5), [`./app/package.json`](https://github.com/HPI-Information-Systems/snowman/blob/b6b13a990a5c51b89be31ba6613abb8822be95e8/app/package.json#L5) and [`./wrapper/package.json`](https://github.com/HPI-Information-Systems/snowman/blob/b6b13a990a5c51b89be31ba6613abb8822be95e8/wrapper/package.json#L5) to the new target version.
2. merge all changes in to the `main` branch with a PR "Release vX.x.x".
3. tag the latest commit on `main` in git with `vX.x.x`  according to the version number.
4. wait for the CI to finish releasing the tag.
5. edit the release draft (Github Release): add a changelog and change the artifact names accordingly.
