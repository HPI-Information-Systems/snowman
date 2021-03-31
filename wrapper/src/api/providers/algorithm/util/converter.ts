import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import {
  Algorithm,
  AlgorithmValuesSoftKPIsGeneralInputFormatEnum,
  AlgorithmValuesSoftKPIsGeneralInterfaceEnum,
  AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum,
  AlgorithmValuesSoftKPIsGeneralUseCaseEnum,
  AlgorithmValuesSoftKPIsInstallationCostsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsInstallationCostsOsEnum,
} from '../../../server/types';
type StoredAlgorithm = ColumnValues<
  typeof tableSchemas['meta']['algorithm']['columns']
>;

export class AlgorithmConverter {
  apiToStored(api: Algorithm): StoredAlgorithm {
    return {
      id: api.id,
      name: api.name,
      description: api.description ?? null,
      matchingSolutionType: api.softKPIs?.general?.matchingSolutionType ?? null,
      useCase: JSON.stringify(api.softKPIs?.general?.useCase) ?? null,
      inputFormat: JSON.stringify(api.softKPIs?.general?.inputFormat) ?? null,
      interface: JSON.stringify(api.softKPIs?.general?._interface) ?? null,
      costs: api.softKPIs?.general?.costs ?? null,

      implementationKnowHowLevel:
        api.softKPIs?.installationCosts?.implementationKnowHowLevel ?? null,
      timeToInstall: api.softKPIs?.installationCosts?.timeToInstall ?? null,
      os: JSON.stringify(api.softKPIs?.installationCosts?.os) ?? null,
    };
  }
  storedToApi(stored: StoredAlgorithm): Algorithm {
    return {
      id: stored.id,
      name: stored.name,
      description: stored.description ?? undefined,
      softKPIs: {
        general: {
          matchingSolutionType:
            (stored.matchingSolutionType as AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum | null) ??
            undefined,
          useCase: stored.useCase
            ? (JSON.parse(
                stored.useCase
              ) as Array<AlgorithmValuesSoftKPIsGeneralUseCaseEnum>)
            : undefined,
          inputFormat: stored.inputFormat
            ? (JSON.parse(
                stored.inputFormat
              ) as Array<AlgorithmValuesSoftKPIsGeneralInputFormatEnum>)
            : undefined,
          _interface: stored.interface
            ? (JSON.parse(
                stored.interface
              ) as Array<AlgorithmValuesSoftKPIsGeneralInterfaceEnum>)
            : undefined,
          costs: stored.costs ?? undefined,
        },
        installationCosts: {
          implementationKnowHowLevel:
            (stored.implementationKnowHowLevel as AlgorithmValuesSoftKPIsInstallationCostsImplementationKnowHowLevelEnum | null) ??
            undefined,
          timeToInstall: stored.timeToInstall ?? undefined,
          os: stored.os
            ? (JSON.parse(
                stored.os
              ) as Array<AlgorithmValuesSoftKPIsInstallationCostsOsEnum>)
            : undefined,
        },
      },
    };
  }
}
