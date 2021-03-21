import { Table, tables } from '../../../../database';
import {
  experimentCustomColumnPrefix,
  tableSchemas,
} from '../../../../database/schemas';
import { ExperimentId, FileResponse } from '../../../../server/types';

type ExperimentSchema = ReturnType<
  typeof tableSchemas['experiment']['experiment']
>;

export class ExperimentFileGetter {
  protected table: Table<ExperimentSchema>;
  protected columns: string[];
  constructor(id: ExperimentId) {
    this.table = tables.experiment.experiment(id);
    this.columns = Object.values(this.table.schema.columns)
      .map((column) => column.name)
      .sort();
  }

  get(startAt?: number, limit?: number, sortBy?: string): FileResponse {
    sortBy = this.getSortedColumn(sortBy);
    return {
      header: this.columns.map((column) =>
        column.startsWith(experimentCustomColumnPrefix)
          ? column.substring(experimentCustomColumnPrefix.length)
          : column
      ),
      data: this.table.all({}, this.columns, true, {
        limit,
        startAt,
        sortBy,
      }) as string[][],
    };
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
