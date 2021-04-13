import { databaseBackend, Table } from '../../../database';
import { experimentCustomColumnPrefix } from '../../../database/schemas';
import { GetterOptionsT } from '../../../database/table/getter';
import {
  Column,
  NullableColumnValues,
  TableSchema,
} from '../../../database/tools/types';
import { ExperimentId, FileResponse } from '../../../server/types';
import { Primitive } from '../../../tools/types';
import { datasetFromExperimentIds } from '../../benchmark/datasetFromExperiments';
import { DatasetIDMapper } from '../../dataset/util/idMapper';

export interface GetterStrategy<Schema extends TableSchema> {
  table: Table<Schema>;
  idColumns: Column[];
  filter: NullableColumnValues<Schema['columns']>;
  filterType: GetterOptionsT<Schema['columns'], boolean>['filterType'];
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
    let result: FileResponse;
    databaseBackend().transaction(
      () =>
        (result = {
          header: this.columns.map((column) =>
            column.startsWith(experimentCustomColumnPrefix)
              ? column.substring(experimentCustomColumnPrefix.length)
              : column
          ),
          data: this.strategy.table
            .all(
              this.strategy.filter as NullableColumnValues<Schema['columns']> &
                Record<string, Primitive>,
              {
                returnedColumns: this.columns,
                raw: true,
                limit,
                startAt,
                sortBy: this.getSortedColumns(sortBy),
                filterType: this.strategy.filterType,
              }
            )
            .map((row) => {
              const resultRow = row.map((element) => `${element}`);
              for (const idIndex of this.idIndices) {
                resultRow[idIndex] =
                  this.idMapper.mapReversed(row[idIndex] as number) ??
                  `mapped: ${row[idIndex]}`;
              }
              return resultRow;
            }) as string[][],
        })
    )();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return result!;
  }

  protected getSortedColumns(sortBy?: string): string[] {
    if (sortBy) {
      if (sortBy in this.strategy.table.schema.columns) {
        return [sortBy];
      } else if (
        experimentCustomColumnPrefix + sortBy in
        this.strategy.table.schema.columns
      ) {
        return [experimentCustomColumnPrefix + sortBy];
      } else {
        throw new Error(
          `Cannot sort by ${sortBy} as this column does not exist.`
        );
      }
    } else {
      return this.strategy.idColumns.map(({ name }) => name);
    }
  }
}
