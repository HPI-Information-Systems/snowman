import { tableSchemas } from '../../../database/schemas';
import { ColumnValues } from '../../../database/tools/types';
import {
  Algorithm,
  AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum,
  AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
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
      implementationKnowHowLevel:
        api.softKPIs?.implementationKnowHowLevel ?? null,
      matchingSolutionType: api.softKPIs?.matchingSolutionType ?? null,
      timeToInstall: api.softKPIs?.timeToInstall ?? null,
      timeToConfigure: api.softKPIs?.timeToConfigure ?? null,
    };
  }
  storedToApi(stored: StoredAlgorithm): Algorithm {
    const implementationKnowHowLevel = stored.implementationKnowHowLevel
      ? convertStringToEnum(
          AlgorithmValuesSoftKPIsImplementationKnowHowLevelEnum,
          stored.implementationKnowHowLevel
        )
      : undefined;
    const matchingSolutionType = stored.matchingSolutionType
      ? convertStringToEnum(
          AlgorithmValuesSoftKPIsMatchingSolutionTypeEnum,
          stored.matchingSolutionType
        )
      : undefined;
    return {
      id: stored.id,
      name: stored.name,
      description: stored.description ?? undefined,
      softKPIs: {
        timeToInstall: stored.timeToInstall ?? undefined,
        timeToConfigure: stored.timeToConfigure ?? undefined,
        implementationKnowHowLevel: implementationKnowHowLevel,
        matchingSolutionType: matchingSolutionType,
      },
    };
  }
}

function convertStringToEnum<T>(type: any, str: string): T[keyof T] {
  const casted = (str.charAt(0).toUpperCase() + str.slice(1)) as keyof T;
  return type[casted];
}
