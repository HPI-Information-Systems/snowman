import { Readable } from 'stream';

import { INSERT_BATCH_SIZE } from '../../../config';
import { Table, tables } from '../../../database';
import {
  similarityCustomColumnPrefix,
  tableSchemas,
} from '../../../database/schemas';
import { escapeColumnName } from '../../../database/tools/escapeColumnNames';
import { Column, NullableColumnValues } from '../../../database/tools/types';
import { DatasetId, ExperimentId } from '../../../server/types';
import { IntersectionCache } from '../../benchmark/cache/flavors/intersectionCache';
import { UnionFind } from '../../benchmark/cluster/unionFind';
import { StaticIntersectionOnlyIncludes } from '../../benchmark/intersection/staticIntersectionOnlyIncludes';
import { DatasetIDMapper } from '../../dataset/util/idMapper';

type ExperimentSchema = ReturnType<
  typeof tableSchemas['experiment']['experiment']
>;
type ExperimentTable = Table<ExperimentSchema>;

/**
 * To be accessible by the API, subclasses have to be added to the
 * @var experimentLoaders map in the index.ts file
 */
export abstract class ExperimentInserter {
  private table: ExperimentTable | undefined = undefined;
  private numberOfUploadedRecords = 0;
  private unionFind: UnionFind;
  private seenIdPairs = new Set<string>();

  constructor(
    protected readonly experimentId: ExperimentId,
    protected readonly idMapper: DatasetIDMapper,
    protected readonly datasetNumberOfRecords: number,
    protected readonly datasetId: DatasetId
  ) {
    this.unionFind = new UnionFind(datasetNumberOfRecords);
  }

  protected abstract insert_internal(file: Readable): Promise<void>;

  public async insert(file: Readable): Promise<number> {
    await this.insert_internal(file);
    this.table && this.table.flushBatchUpsert();
    if (!this.table) {
      this.getOrCreateTable({});
    }
    this.table && this.table.createIndices(true);
    (IntersectionCache.get({
      datasetId: this.datasetId,
      included: [{ experimentId: this.experimentId }],
      excluded: [],
    }) as StaticIntersectionOnlyIncludes).clustering = this.unionFind;
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
    if (this.isValidPair(id1, id2)) {
      const table = this.getOrCreateTable(similarityScores);
      table.batchUpsert(
        [
          () =>
            this.rowToInsertParameters(
              id1,
              id2,
              detectedAsDuplicate,
              similarityScores
            ),
        ],
        INSERT_BATCH_SIZE
      );
    }
  }

  private isValidPair(id1: string, id2: string) {
    if (id1 === id2) {
      return false;
    }

    const idPair = encodeURIComponent(id1) + '/' + id2;
    if (this.seenIdPairs.has(idPair)) {
      return false;
    }

    this.seenIdPairs.add(idPair);
    return true;
  }

  private getOrCreateTable(similarityScores: {
    [name: string]: number;
  }): ExperimentTable {
    if (!this.table) {
      this.table = tables.experiment.experiment(
        this.experimentId,
        this.columnsFromNames(Object.keys(similarityScores))
      );
      this.table.create(true, false);
    }
    return this.table;
  }

  private columnsFromNames(columns: string[]): Column<'REAL'>[] {
    return columns.map((column) => {
      return {
        name: column,
        dataType: 'REAL',
      } as const;
    });
  }

  private rowToInsertParameters(
    id1String: string,
    id2String: string,
    detectedAsDuplicate: boolean,
    similarityScores: { [name: string]: number }
  ): NullableColumnValues<ExperimentSchema['columns']> {
    const id1 = this.idMapper.map(id1String, this.datasetNumberOfRecords);
    const id2 = this.idMapper.map(id2String, this.datasetNumberOfRecords);
    // hier überschreibt er
    const isDuplicateAndLinksUnlinkedNodes =
      detectedAsDuplicate && !this.unionFind.nodesAreLinked(id1, id2);
    if (isDuplicateAndLinksUnlinkedNodes) {
      this.unionFind.link([[id1, id2]]);
    }
    return {
      id1,
      id2,
      isDuplicate: detectedAsDuplicate ? 1 : 0,
      isDuplicateAndLinksUnlinkedNodes: isDuplicateAndLinksUnlinkedNodes
        ? 1
        : 0,
      ...Object.fromEntries(
        Object.entries(similarityScores).map(([score, value]) => [
          escapeColumnName(score, similarityCustomColumnPrefix),
          value,
        ])
      ),
    };
  }
}
