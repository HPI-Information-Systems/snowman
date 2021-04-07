import { databaseBackend, Table, tables } from '../../../database';
import {
  experimentCustomColumnPrefix,
  tableSchemas,
} from '../../../database/schemas';
import { DatasetId, ExperimentId, FileResponse } from '../../../server/types';
import { DatasetIDMapper } from '../../dataset/util/idMapper';

type ExperimentSchema = ReturnType<
  typeof tableSchemas['experiment']['experiment']
>;

export class ExperimentFileGetter {
  protected table: Table<ExperimentSchema>;
  protected columns: string[];
  protected idIndices: number[];
  protected idMapper: DatasetIDMapper;

  constructor(id: ExperimentId, datasetId: DatasetId) {
    this.table = tables.experiment.experiment(id);
    this.columns = Object.values(this.table.schema.columns)
      .map((column) => column.name)
      .sort();
    this.idIndices = [
      this.columns.indexOf(this.table.schema.columns.id1.name),
      this.columns.indexOf(this.table.schema.columns.id2.name),
    ];
    this.idMapper = new DatasetIDMapper(datasetId);
  }

  get(startAt?: number, limit?: number, sortBy?: string): FileResponse {
    sortBy = this.getSortedColumn(sortBy);
    let result: FileResponse;
    databaseBackend().transaction(
      () =>
        (result = {
          header: this.columns.map((column) =>
            column.startsWith(experimentCustomColumnPrefix)
              ? column.substring(experimentCustomColumnPrefix.length)
              : column
          ),
          data: this.table
            .all({}, this.columns, true, {
              limit,
              startAt,
              sortBy,
            })
            .map((row) => {
              for (const idIndex of this.idIndices) {
                row[idIndex] =
                  this.idMapper.mapReversed(row[idIndex] as number) ??
                  `mapped: ${row[idIndex]}`;
              }
              return row;
            }) as string[][],
        })
    )();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return result!;
  }

  protected getSortedColumn(sortBy?: string): string {
    if (sortBy) {
      if (sortBy in this.table.schema.columns) {
        return sortBy;
      } else if (
        experimentCustomColumnPrefix + sortBy in
        this.table.schema.columns
      ) {
        return experimentCustomColumnPrefix + sortBy;
      } else {
        throw new Error(
          `Cannot sort by ${sortBy} as this column does not exist.`
        );
      }
    } else {
      return this.table.schema.columns.id1.name;
    }
  }
}
