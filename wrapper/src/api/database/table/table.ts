import { TableSchema } from '../tools/types';
import { TableCreator } from './creator';
import { TableDeleter } from './deleter';
import { InsertParameters, TableInserter } from './inserter';

export class Table<Schema extends TableSchema> {
  private _inserter?: TableInserter<Schema>;

  private get inserter(): TableInserter<Schema> {
    if (!this._inserter) {
      this._inserter = new TableInserter(this);
    }
    return this._inserter;
  }

  constructor(public readonly schema: Schema) {}

  insert(
    ...rows: InsertParameters<Schema>
  ): ReturnType<TableInserter<Schema>['insert']> {
    return this.inserter.insert(...rows);
  }

  batchInsert(
    ...args: Parameters<TableInserter<Schema>['batchInsert']>
  ): ReturnType<TableInserter<Schema>['batchInsert']> {
    return this.inserter.batchInsert(...args);
  }

  flushBatchInsert(
    ...args: Parameters<TableInserter<Schema>['flushBatchInsert']>
  ): ReturnType<TableInserter<Schema>['flushBatchInsert']> {
    return this.inserter.flushBatchInsert(...args);
  }

  create(
    ...args: Parameters<TableCreator<Schema>['createTable']>
  ): ReturnType<TableCreator<Schema>['createTable']> {
    return new TableCreator(this).createTable(...args);
  }

  createIndices(
    ...args: Parameters<TableCreator<Schema>['createIndices']>
  ): ReturnType<TableCreator<Schema>['createIndices']> {
    return new TableCreator(this).createIndices(...args);
  }

  delete(
    ...args: Parameters<TableDeleter<Schema>['deleteTable']>
  ): ReturnType<TableDeleter<Schema>['deleteTable']> {
    return new TableDeleter(this).deleteTable(...args);
  }

  toString(): string {
    return `"${this.schema.schema}"."${this.schema.name}"`;
  }
}
