import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import { Algorithm } from '../../../server/types';
type StoredAlgorithm = ColumnValues<
  typeof tableSchemas['meta']['algorithm']['columns']
>;

export class AlgorithmConverter {
  apiToStored(api: Algorithm): StoredAlgorithm {
    return {
      id: api.id,
      name: api.name,
      description: api.description ?? null,
      integrationTime: api.softKPIs?.integrationEffort?.integrationTime ?? null,
      deploymentType:
        JSON.stringify(api.softKPIs?.integrationEffort?.deploymentType) ?? null,
      solutionType:
        JSON.stringify(api.softKPIs?.integrationEffort?.solutionType) ?? null,
      useCase: JSON.stringify(api.softKPIs?.integrationEffort?.useCase) ?? null,
      generalCosts: api.softKPIs?.integrationEffort?.generalCosts ?? null,
      matchingSolutionExpertise:
        api.softKPIs?.configurationEffort?.matchingSolution?.expertise ?? null,
      matchingSolutionHrAmount:
        api.softKPIs?.configurationEffort?.matchingSolution?.hrAmmount ?? null,
      domainExpertise:
        api.softKPIs?.configurationEffort?.domain?.expertise ?? null,
      domainHrAmount:
        api.softKPIs?.configurationEffort?.domain?.hrAmmount ?? null,
      interfaces:
        JSON.stringify(api.softKPIs?.configurationEffort?.interfaces) ?? null,
      supportedOS:
        JSON.stringify(api.softKPIs?.configurationEffort?.supportedOS) ?? null,
    };
  }
  storedToApi(stored: StoredAlgorithm): Algorithm {
    return {
      id: stored.id,
      name: stored.name,
      description: stored.description ?? undefined,
      softKPIs: {
        integrationEffort: {
          integrationTime: stored.integrationTime ?? undefined,
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
            hrAmmount: stored.matchingSolutionHrAmount ?? undefined,
          },
          domain: {
            expertise: stored.domainExpertise ?? undefined,
            hrAmmount: stored.domainHrAmount ?? undefined,
          },
          interfaces: stored.interfaces
            ? JSON.parse(stored.interfaces)
            : undefined,
          supportedOS: stored.supportedOS
            ? JSON.parse(stored.supportedOS)
            : undefined,
        },
      },
    };
  }
}
