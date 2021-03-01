# Contributing Knowledge

This document contains information about how to extend the codebase in specific cases. For general contributing guidelines see [here](https://github.com/HPI-Information-Systems/snowman#Contributing).

## Updating the database schema

1. create a folder for the new version in `api/database/schemas` named like `v1`
2. copy all files from the previous version
3. make necessary changes
4. edit the `migration.ts` file and update `version`, `successor` and `migrateFromLastVersion`
   - make sure the `version` is unique
   - `migrateFromLastVersion` contains the migration logic
5. update `api/database/schemas/index.ts` and export the new version as `latest`
