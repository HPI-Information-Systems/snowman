import {
  Experiment,
  ExperimentConfigItem,
  SimilarityThresholdFunction,
} from 'api';
import {
  BenchmarkAppModel,
  BenchmarkAppResourcesModel,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { formatLargeNumber } from 'utils/formatLargeNumber';

export function resolveExperimentEntity(
  {
    experimentId,
    funcId,
    threshold,
  }: {
    experimentId?: number;
    funcId?: number;
    threshold?: number;
  },
  resources: BenchmarkAppResourcesModel
): ExperimentEntity | undefined {
  const resolvedExperiment = resources.experiments.find(
    (anExperiment: Experiment): boolean => anExperiment.id === experimentId
  );
  const resolvedSimilarityFunction = resources.simFunctions.find(
    (aSimFunction: SimilarityThresholdFunction): boolean =>
      aSimFunction.id === funcId
  );
  if (resolvedExperiment !== undefined) {
    if (resolvedSimilarityFunction !== undefined) {
      return {
        experiment: resolvedExperiment,
        similarity: {
          func: resolvedSimilarityFunction,
          threshold: threshold ?? 0,
        },
      };
    } else {
      return {
        experiment: resolvedExperiment,
      };
    }
  } else {
    return undefined;
  }
}

export function experimentEntityFromConfig(
  {
    experiment,
    threshold,
    simFunction,
  }: {
    experiment: number[];
    threshold: number[];
    simFunction: number[];
  },
  resources: BenchmarkAppModel['resources']
): ExperimentEntity | undefined {
  return resolveExperimentEntity(
    {
      experimentId: experiment[0],
      threshold: threshold[0],
      funcId: simFunction[0],
    },
    resources
  );
}

export function experimentEntitiesEqual(
  e1: ExperimentEntity,
  e2: ExperimentEntity
): boolean {
  return (
    e1.experiment.id === e2.experiment.id &&
    e1.similarity?.func.id === e2.similarity?.func.id &&
    e1.similarity?.threshold === e2.similarity?.threshold
  );
}

export function experimentConfigItemsEqual(
  e1: ExperimentConfigItem,
  e2: ExperimentConfigItem
): boolean {
  return (
    e1.experimentId === e2.experimentId &&
    e1.similarity?.func === e2.similarity?.func &&
    e1.similarity?.threshold === e2.similarity?.threshold
  );
}

export function experimentEntityToExperimentConfigItem(
  entity: ExperimentEntity
): ExperimentConfigItem {
  if (entity.similarity !== undefined) {
    return {
      experimentId: entity.experiment.id,
      similarity: {
        func: entity.similarity.func.id,
        threshold: entity.similarity.threshold,
      },
    };
  } else {
    return {
      experimentId: entity.experiment.id,
    };
  }
}

export function stringifyExperimentEntity(entity?: ExperimentEntity): string {
  return entity
    ? entity.experiment.name +
        (entity.similarity
          ? ` (${entity.similarity.func.name} = ${formatLargeNumber(
              entity.similarity.threshold
            )})`
          : '')
    : '';
}

export function uniqueExperimentEntityKey(entity: ExperimentEntity): string {
  return uniqueExperimentConfigKey(
    experimentEntityToExperimentConfigItem(entity)
  );
}

export function uniqueExperimentConfigKey({
  experimentId,
  similarity,
}: ExperimentConfigItem): string {
  return `${experimentId}-${similarity?.func}-${similarity?.threshold}`;
}
