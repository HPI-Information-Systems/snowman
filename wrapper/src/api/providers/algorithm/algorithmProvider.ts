import { tables } from '../../database';
import { Algorithm, AlgorithmId, AlgorithmValues } from '../../server/types';
import { AlgorithmConverter } from './util/converter';

export class AlgorithmProvider {
  protected readonly converter = new AlgorithmConverter();

  listAlgorithms(): Algorithm[] {
    return tables.meta.algorithm
      .all()
      .map((stored) => this.converter.storedToApi(stored));
  }

  addAlgorithm(algorithm: AlgorithmValues): AlgorithmId {
    return tables.meta.algorithm.upsert([
      {
        name: algorithm.name,
        description: algorithm.description,
        integrationTime: algorithm.softKPIs?.integrationEffort?.integrationTime,
        deploymentType: JSON.stringify(
          algorithm.softKPIs?.integrationEffort?.deploymentType
        ),
        solutionType: JSON.stringify(
          algorithm.softKPIs?.integrationEffort?.solutionType
        ),
        useCase: JSON.stringify(algorithm.softKPIs?.integrationEffort?.useCase),
        generalCosts: algorithm.softKPIs?.integrationEffort?.generalCosts,
        matchingSolutionExpertise:
          algorithm.softKPIs?.configurationEffort?.matchingSolution?.expertise,
        matchingSolutionHrAmount:
          algorithm.softKPIs?.configurationEffort?.matchingSolution?.hrAmmount,
        domainExpertise:
          algorithm.softKPIs?.configurationEffort?.domain?.expertise,
        domainHrAmount:
          algorithm.softKPIs?.configurationEffort?.domain?.hrAmmount,
        interfaces: JSON.stringify(
          algorithm.softKPIs?.configurationEffort?.interfaces
        ),
        supportedOS: JSON.stringify(
          algorithm.softKPIs?.configurationEffort?.supportedOS
        ),
      },
    ])[0];
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
