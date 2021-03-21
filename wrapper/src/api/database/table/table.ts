import { TableSchema } from '../tools/types';
import { TableCounter } from './counter';
import { TableCreator } from './creator';
import { TableDeleter } from './deleter';
import { TableGetter } from './getter';
import { TableMeta } from './meta';
import { TableUpserter } from './upserter';

export class Table<Schema extends TableSchema> {
  protected inserter = new TableUpserter<Schema>(this);
  protected getter = new TableGetter<Schema>(this);
  protected deleter = new TableDeleter<Schema>(this);
  protected creator = new TableCreator<Schema>(this);
  protected counter = new TableCounter<Schema>(this);
  protected meta = new TableMeta<Schema>(this);

  constructor(protected _schema: Schema) {}

  get schema(): Schema {
    return this._schema;
  }

  exists: TableMeta<Schema>['exists'] = (...args) => this.meta.exists(...args);
  create: TableCreator<Schema>['createTable'] = (...args) =>
    this.creator.createTable(...args);
  createIndices: TableCreator<Schema>['createIndices'] = (...args) =>
    this.creator.createIndices(...args);
  loadSchemaFromDatabase(): void {
    this._schema = this.meta.loadSchemaFromDatabase();
  }

  upsert: TableUpserter<Schema>['upsert'] = (...args) =>
    this.inserter.upsert(...args);
  batchUpsert: TableUpserter<Schema>['batchUpsert'] = (...args) =>
    this.inserter.batchUpsert(...args);
  flushBatchUpsert: TableUpserter<Schema>['flushBatchUpsert'] = (...args) =>
    this.inserter.flushBatchUpsert(...args);

  get: TableGetter<Schema>['get'] = (...args) => this.getter.get(...args);
  all: TableGetter<Schema>['all'] = (...args) => this.getter.all(...args);
  count: TableCounter<Schema>['count'] = (...args) =>
    this.counter.count(...args);

  delete: TableDeleter<Schema>['delete'] = (...args) =>
    this.deleter.delete(...args);
  dropTable: TableDeleter<Schema>['dropTable'] = (...args) =>
    this.deleter.dropTable(...args);

  toString(): string {
    return `"${this.schema.schema}"."${this.schema.name}"`;
  }
}
