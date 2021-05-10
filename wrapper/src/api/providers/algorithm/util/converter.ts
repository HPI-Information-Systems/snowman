import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import { Algorithm, Metric } from '../../../server/types';
import { calculateEffort } from './effortPoints/calculateEffort';
type StoredAlgorithm = ColumnValues<
  typeof tableSchemas['meta']['algorithm']['columns']
>;

export class AlgorithmConverter {
  apiToStored(api: Algorithm): StoredAlgorithm {
    return {
      id: api.id,
      name: api.name,
      description: api.description ?? null,
      installationExpertise:
        api.softKPIs?.integrationEffort?.installationEffort?.expertise ?? null,
      installationHrAmount:
        api.softKPIs?.integrationEffort?.installationEffort?.hrAmount ?? null,
      deploymentType:
        JSON.stringify(api.softKPIs?.integrationEffort?.deploymentType) ?? null,
      solutionType:
        JSON.stringify(api.softKPIs?.integrationEffort?.solutionType) ?? null,
      useCase: JSON.stringify(api.softKPIs?.integrationEffort?.useCase) ?? null,
      generalCosts: api.softKPIs?.integrationEffort?.generalCosts ?? null,
      matchingSolutionExpertise:
        api.softKPIs?.configurationEffort?.matchingSolution?.expertise ?? null,
      matchingSolutionHrAmount:
        api.softKPIs?.configurationEffort?.matchingSolution?.hrAmount ?? null,
      domainExpertise:
        api.softKPIs?.configurationEffort?.domain?.expertise ?? null,
      domainHrAmount:
        api.softKPIs?.configurationEffort?.domain?.hrAmount ?? null,
      interfaces:
        JSON.stringify(api.softKPIs?.configurationEffort?.interfaces) ?? null,
      supportedOSs:
        JSON.stringify(api.softKPIs?.configurationEffort?.supportedOSs) ?? null,
    };
  }
  storedToApi(stored: StoredAlgorithm): Algorithm {
    let domainEffort: Metric[] | undefined;
    let matchingSolutionEffort: Metric[] | undefined;
    let installationEffort: Metric[] | undefined;
    if (stored.domainExpertise && stored.domainHrAmount) {
      domainEffort = calculateEffort(
        stored.domainExpertise,
        stored.domainHrAmount
      );
    }
    if (stored.matchingSolutionExpertise && stored.matchingSolutionHrAmount) {
      matchingSolutionEffort = calculateEffort(
        stored.matchingSolutionExpertise,
        stored.matchingSolutionHrAmount
      );
    }
    if (stored.installationExpertise && stored.installationHrAmount) {
      installationEffort = calculateEffort(
        stored.installationExpertise,
        stored.installationHrAmount
      );
    }
    return {
      id: stored.id,
      name: stored.name,
      description: stored.description ?? undefined,
      matchingSolutionEffort,
      domainEffort,
      installationEffort,
      softKPIs: {
        integrationEffort: {
          installationEffort: {
            expertise: stored.installationExpertise ?? undefined,
            hrAmount: stored.installationHrAmount ?? undefined,
          },
          deploymentType: stored.deploymentType
            ? JSON.parse(stored.deploymentType)
            : undefined,
          solutionType: stored.solutionType
            ? JSON.parse(stored.solutionType)
            : undefined,
          useCase: stored.useCase ? JSON.parse(stored.useCase) : undefined,
          generalCosts: stored.generalCosts ?? undefined,
        },
        configurationEffort: {
          matchingSolution: {
            expertise: stored.matchingSolutionExpertise ?? undefined,
            hrAmount: stored.matchingSolutionHrAmount ?? undefined,
          },
          domain: {
            expertise: stored.domainExpertise ?? undefined,
            hrAmount: stored.domainHrAmount ?? undefined,
          },
          interfaces: stored.interfaces
            ? JSON.parse(stored.interfaces)
            : undefined,
          supportedOSs: stored.supportedOSs
            ? JSON.parse(stored.supportedOSs)
            : undefined,
        },
      },
    };
  }
}
