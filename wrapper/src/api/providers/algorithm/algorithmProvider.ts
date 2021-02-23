import { databaseBackend, Table } from '../../database';
import { tableSchemas } from '../../database/schemas';
import { Algorithm, AlgorithmId, AlgorithmValues } from '../../server/types';
import { BaseAlgorithmProvider } from './baseAlgorithmProvider';

export class AlgorithmProvider extends BaseAlgorithmProvider {
  protected readonly schema = tableSchemas.meta.algorithm;
  protected readonly table = new Table(this.schema);
  protected readonly listAlgorithmsQuery = databaseBackend().prepare(
    `SELECT "${this.schema.columns.name.name}" as name,
            "${this.schema.columns.description.name}" as description,
            "${this.schema.columns.id.name}" as id
       FROM ${this.table}`
  );
  protected readonly getAlgorithmQuery = databaseBackend().prepare(
    `SELECT "${this.schema.columns.name.name}" as name,
            "${this.schema.columns.description.name}" as description,
            "${this.schema.columns.id.name}" as id
       FROM ${this.table}
      WHERE "${this.schema.columns.id.name}" = ?`
  );
  protected readonly setAlgorithmQuery = databaseBackend().prepare(
    `INSERT OR REPLACE INTO ${this.table}("${this.schema.columns.id.name}", 
                                          "${this.schema.columns.name.name}",
                                          "${this.schema.columns.description.name}")
                                   VALUES(@id,
                                          @name,
                                          @description)`
  );
  protected readonly deleteAlgorithmQuery = databaseBackend().prepare(
    `DELETE FROM ${this.table}
      WHERE "${this.schema.columns.id.name}" = ?`
  );
  protected readonly algorithmUsagesQuery = databaseBackend().prepare(
    `SELECT "${
      tableSchemas.meta.experiment.columns.name.name
    }" as experimentName,
            "${tableSchemas.meta.experiment.columns.id.name}" as experimentId
     FROM ${new Table(tableSchemas.meta.experiment)}
     WHERE "${tableSchemas.meta.experiment.columns.algorithm.name}" = ?`
  );

  listAlgorithms(): Algorithm[] {
    return this.listAlgorithmsQuery.all();
  }

  addAlgorithm(algorithm: AlgorithmValues): AlgorithmId {
    return this.table.insert([
      {
        column: this.schema.columns.name,
        value: algorithm.name,
      },
      {
        column: this.schema.columns.description,
        value: algorithm.description || null,
      },
    ])[0];
  }

  getAlgorithm(id: AlgorithmId): Algorithm {
    const algorithm = this.getAlgorithmQuery.all(id);
    if (algorithm.length === 0) {
      throw new Error(`An algorithm with the id ${id} does not exist.`);
    }
    return algorithm[0];
  }

  setAlgorithm(id: AlgorithmId, algorithm: AlgorithmValues): void {
    this.setAlgorithmQuery.run({
      id,
      name: algorithm.name,
      description: algorithm.description || null,
    });
  }

  private algorithmUsages(
    id: AlgorithmId
  ): { experimentId: number; experimentName: string }[] {
    return this.algorithmUsagesQuery.all(id);
  }

  private throwIfAlgorithmIsUsed(id: AlgorithmId) {
    const usages = this.algorithmUsages(id);
    if (usages.length > 0) {
      const algorithm = this.getAlgorithm(id);
      const experiments = usages
        .map(
          ({ experimentId, experimentName }) =>
            `${experimentName} (${experimentId})`
        )
        .join(', ');
      throw new Error(
        `The algorithm ${algorithm.name} (${algorithm.id}) is used by the experiments ${experiments}.`
      );
    }
  }

  deleteAlgorithm(id: AlgorithmId): void {
    this.throwIfAlgorithmIsUsed(id);
    this.deleteAlgorithmQuery.run(id);
  }
}
