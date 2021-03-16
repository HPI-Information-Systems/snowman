import { tables } from '../../database';
import { tableSchemas } from '../../database/schemas';
import { Algorithm, AlgorithmId, AlgorithmValues } from '../../server/types';
import { AlgorithmConverter } from './util/converter';

export class AlgorithmProvider {
  readonly schema = tableSchemas.meta.algorithm;
  protected readonly converter = new AlgorithmConverter();

  listAlgorithms(): Algorithm[] {
    return tables.meta.algorithm
      .all()
      .map((stored) => this.converter.storedToApi(stored));
  }

  addAlgorithm(algorithm: AlgorithmValues): AlgorithmId {
    return tables.meta.algorithm
      .upsert([
        {
          name: algorithm.name,
          description: algorithm.description || null,
        },
      ])
      .slice(-1)[0];
  }

  getAlgorithm(id: AlgorithmId): Algorithm {
    const algorithm = tables.meta.algorithm.get({ id });
    if (!algorithm) {
      throw new Error(`A matching solution with the id ${id} does not exist.`);
    }
    return this.converter.storedToApi(algorithm);
  }

  setAlgorithm(id: AlgorithmId, algorithm: AlgorithmValues): void {
    tables.meta.algorithm.upsert([
      this.converter.apiToStored({ ...algorithm, id }),
    ]);
  }

  private algorithmUsages(id: AlgorithmId) {
    return tables.meta.experiment.all({ algorithm: id });
  }

  private throwIfAlgorithmIsUsed(id: AlgorithmId) {
    const usages = this.algorithmUsages(id);
    if (usages.length > 0) {
      const algorithm = this.getAlgorithm(id);
      const experiments = usages
        .map(({ id, name }) => `${name} (${id})`)
        .join(', ');
      throw new Error(
        `The matching solution ${algorithm.name} (${algorithm.id}) is used by the experiments ${experiments}.`
      );
    }
  }

  deleteAlgorithm(id: AlgorithmId): void {
    this.throwIfAlgorithmIsUsed(id);
    tables.meta.algorithm.delete({ id });
  }
}
