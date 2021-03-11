import { Readable } from 'stream';

import { INSERT_BATCH_SIZE } from '../../../../config';
import { Table } from '../../../../database';
import { latest } from '../../../../database/schemas';
import { escapeColumnName } from '../../../../database/tools/escapeColumnNames';
import { Column } from '../../../../database/tools/types';
import { DatasetIDMapper } from '../../../dataset/datasetProvider/util/idMapper';

type ExperimentSchema = ReturnType<
  typeof latest.tableSchemas['experiment']['experiment']
>;
type ExperimentTable = Table<ExperimentSchema>;

/**
 * To be accessible by the API, subclasses have to be added to the
 * @var experimentLoaders map in the index.ts file
 */
export abstract class ExperimentInserter {
  private table: ExperimentTable | undefined = undefined;
  private numberOfUploadedRecords = 0;

  constructor(
    protected readonly experimentId: number,
    protected readonly idMapper: DatasetIDMapper
  ) {}

  protected abstract insert_internal(file: Readable): Promise<void>;

  public async insert(file: Readable): Promise<number> {
    await this.insert_internal(file);
    this.table && this.table.flushBatchInsert();
    if (!this.table) {
      this.getOrCreateTable({});
    }
    this.table && this.table.createIndices(true);
    return this.numberOfUploadedRecords;
  }

  protected addDuplicate(
    id1: string,
    id2: string,
    detectedAsDuplicate = true,
    similarityScores: { [name: string]: number } = {}
  ): void {
    this.numberOfUploadedRecords++;
    [id1, id2] = [id1, id2].sort();
    const table = this.getOrCreateTable(similarityScores);
    table.batchInsert(
      () =>
        this.rowToInsertParameters(
          table.schema.columns,
          id1,
          id2,
          detectedAsDuplicate,
          similarityScores
        ),
      INSERT_BATCH_SIZE
    );
  }

  private getOrCreateTable(similarityScores: {
    [name: string]: number;
  }): ExperimentTable {
    if (!this.table) {
      this.table = new Table(
        this.getTableSchema(Object.keys(similarityScores))
      );
      this.table.create(true, false);
    }
    return this.table;
  }

  private getTableSchema(columns: string[]): ExperimentSchema {
    return latest.tableSchemas.experiment.experiment(
      this.experimentId,
      this.columnsFromNames(columns)
    );
  }

  private columnsFromNames(columns: string[]): Column[] {
    return columns.map((column) => {
      return {
        name: column,
        dataType: 'REAL',
      } as const;
    });
  }

  private rowToInsertParameters(
    columns: ReturnType<
      typeof latest.tableSchemas['experiment']['experiment']
    >['columns'],
    id1: string,
    id2: string,
    detectedAsDuplicate: boolean,
    similarityScores: { [name: string]: number }
  ) {
    const inserts: Parameters<
      Table<
        ReturnType<typeof latest.tableSchemas['experiment']['experiment']>
      >['insert']
    > = [
      [
        {
          column: columns.id1,
          value: this.idMapper.map(id1),
        },
        {
          column: columns.id2,
          value: this.idMapper.map(id2),
        },
        {
          column: columns.isDuplicate,
          value: detectedAsDuplicate ? 1 : 0,
        },
        ...Object.entries(similarityScores).map(([score, value]) => {
          return {
            column: columns[
              escapeColumnName(score, latest.experimentCustomColumnPrefix)
            ] as Column<'REAL'> & {
              autoIncrement: false;
            },
            value,
          };
        }),
      ],
    ];
    return inserts;
  }
}
