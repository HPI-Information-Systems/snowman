import { getProviders } from '../../../providers';
import {
  AlgorithmId,
  AlgorithmValues,
  AlgorithmValuesSoftKPIsGeneralInputFormatEnum,
  AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum,
  AlgorithmValuesSoftKPIsGeneralUserInterfaceEnum,
  AlgorithmValuesSoftKPIsInstallationCostsImplementationKnowHowLevelEnum,
} from '../../../server/types';
import { assertType } from '../../../tools/types';
import { GoldStandardId, SilverStandardId } from './constants';

export type ExampleAlgorithms = {
  [key: string]: {
    meta: AlgorithmValues;
    id: AlgorithmId;
  };
};

export function loadExampleAlgorithms(algorithms: ExampleAlgorithms): void {
  const algorithmProvider = getProviders().algorithm;
  for (const { id, meta } of Object.values(algorithms)) {
    algorithmProvider.setAlgorithm(id, meta);
  }
}

export const exampleAlgorithms = assertType<ExampleAlgorithms>()({
  silver: {
    meta: {
      name: 'Silver Standard',
      description: 'Incomplete list of all duplicates a dataset contains.',
      softKPIs: {
        general: {
          matchingSolutionType:
            AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum.Other,
        },
      },
    },
    id: SilverStandardId,
  },
  gold: {
    meta: {
      name: 'Gold Standard',
      description: 'Complete list of all duplicates a dataset contains.',
      softKPIs: {
        general: {
          matchingSolutionType:
            AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum.Other,
        },
      },
    },
    id: GoldStandardId,
  },
  mock: {
    meta: {
      name: 'Mock Solution',
      description: 'Experiments constructed for testing purposes only.',
      softKPIs: {
        general: {
          matchingSolutionType:
            AlgorithmValuesSoftKPIsGeneralMatchingSolutionTypeEnum.Rulebased,
          inputFormat: [AlgorithmValuesSoftKPIsGeneralInputFormatEnum.Csv],
          _interface: [AlgorithmValuesSoftKPIsGeneralUserInterfaceEnum.Api],
        },
        installationCosts: {
          implementationKnowHowLevel:
            AlgorithmValuesSoftKPIsInstallationCostsImplementationKnowHowLevelEnum.Starter,
          timeToInstall: 30 * 60,
        },
      },
    },
    id: -3,
  },
});
