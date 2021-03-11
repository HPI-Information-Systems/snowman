import { LazyProperty } from '../../tools/lazyProperty';
import { TableSchema } from '../tools/types';
import { TableCreator } from './creator';
import { TableDeleter } from './deleter';
import { TableGetter } from './getter';
import { InsertParameters, TableInserter } from './inserter';

export class Table<Schema extends TableSchema> {
  protected inserter = new LazyProperty(() => new TableInserter<Schema>(this));
  protected getter = new TableGetter<Schema>(this);

  constructor(public readonly schema: Schema) {}

  get(
    ...args: Parameters<TableGetter<Schema>['get']>
  ): ReturnType<TableGetter<Schema>['get']> {
    return this.getter.get(...args);
  }

  all(
    ...args: Parameters<TableGetter<Schema>['all']>
  ): ReturnType<TableGetter<Schema>['all']> {
    return this.getter.all(...args);
  }

  insert(
    ...args: InsertParameters<Schema>
  ): ReturnType<TableInserter<Schema>['insert']> {
    return this.inserter.value.insert(...args);
  }

  batchInsert(
    ...args: Parameters<TableInserter<Schema>['batchInsert']>
  ): ReturnType<TableInserter<Schema>['batchInsert']> {
    return this.inserter.value.batchInsert(...args);
  }

  flushBatchInsert(
    ...args: Parameters<TableInserter<Schema>['flushBatchInsert']>
  ): ReturnType<TableInserter<Schema>['flushBatchInsert']> {
    return this.inserter.value.flushBatchInsert(...args);
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
