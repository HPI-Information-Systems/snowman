import { databaseBackend, tables } from '../../database';
import { Algorithm, AlgorithmId, AlgorithmValues } from '../../server/types';
import { providers } from '..';
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
        installationExpertise:
          algorithm.softKPIs?.integrationEffort?.installationEffort?.expertise,
        installationHrAmount:
          algorithm.softKPIs?.integrationEffort?.installationEffort?.hrAmount,
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
          algorithm.softKPIs?.configurationEffort?.matchingSolution?.hrAmount,
        domainExpertise:
          algorithm.softKPIs?.configurationEffort?.domain?.expertise,
        domainHrAmount:
          algorithm.softKPIs?.configurationEffort?.domain?.hrAmount,
        interfaces: JSON.stringify(
          algorithm.softKPIs?.configurationEffort?.interfaces
        ),
        supportedOSs: JSON.stringify(
          algorithm.softKPIs?.configurationEffort?.supportedOSs
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

  deleteAlgorithm(id: AlgorithmId): void {
    return databaseBackend().transaction(() => {
      this.deleteExperimentsOfAlgorithm(id);
      tables.meta.algorithm.delete({ id });
    })();
  }

  private deleteExperimentsOfAlgorithm(id: AlgorithmId) {
    for (const { id: experimentId } of tables.meta.experiment.all({
      algorithm: id,
    })) {
      providers.experiment.deleteExperiment(experimentId);
    }
  }
}
