import { databaseBackend, Table } from '../../../database';
import { similarityCustomColumnPrefix } from '../../../database/schemas';
import { AdvancedFilterT } from '../../../database/table/getter';
import { Column, TableSchema } from '../../../database/tools/types';
import { ExperimentId, FileResponse } from '../../../server/types';
import { datasetFromExperimentIds } from '../../benchmark/datasetFromExperiments';
import { DatasetIDMapper } from '../../dataset/util/idMapper';

export interface GetterStrategy<Schema extends TableSchema> {
  table: Table<Schema>;
  idColumns: Column[];
  filters: AdvancedFilterT<Schema['columns']>;
}

export class ExperimentFileGetter<Schema extends TableSchema> {
  protected idIndices: number[];
  protected columns: string[];
  protected idMapper: DatasetIDMapper;

  constructor(protected strategy: GetterStrategy<Schema>, id: ExperimentId) {
    this.columns = Object.values(this.strategy.table.schema.columns)
      .map((column) => column.name)
      .sort();
    this.idIndices = strategy.idColumns.map(({ name }) =>
      this.columns.indexOf(name)
    );
    this.idMapper = new DatasetIDMapper(datasetFromExperimentIds([id]).id);
  }

  get(startAt?: number, limit?: number, sortBy?: string): FileResponse {
    return databaseBackend().transaction(() => ({
      header: this.columns.map((column) =>
        column.startsWith(similarityCustomColumnPrefix)
          ? column.substring(similarityCustomColumnPrefix.length)
          : column
      ),
      data: this.strategy.table
        .all(undefined, {
          returnedColumns: this.columns,
          raw: true,
          limit,
          startAt,
          sortBy: this.getSortedColumns(sortBy),
          advancedFilters: this.strategy.filters,
        })
        .map((row) => {
          const resultRow = row.map((element) => `${element}`);
          for (const idIndex of this.idIndices) {
            resultRow[idIndex] =
              this.idMapper.mapReversed(row[idIndex] as number) ??
              `mapped: ${row[idIndex]}`;
          }
          return resultRow;
        }) as string[][],
    }))();
  }

  protected getSortedColumns(sortBy?: string): [string, 'ASC' | 'DESC'][] {
    if (sortBy) {
      if (sortBy in this.strategy.table.schema.columns) {
        return [[sortBy, 'ASC']];
      } else if (
        similarityCustomColumnPrefix + sortBy in
        this.strategy.table.schema.columns
      ) {
        return [[similarityCustomColumnPrefix + sortBy, 'ASC']];
      } else {
        throw new Error(
          `Cannot sort by ${sortBy} as this column does not exist.`
        );
      }
    } else {
      return this.strategy.idColumns.map(({ name }) => [name, 'ASC']);
    }
  }
}
