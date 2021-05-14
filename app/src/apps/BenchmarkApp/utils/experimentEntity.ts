import {
  Experiment,
  ExperimentConfigItem,
  SimilarityThresholdFunction,
} from 'api';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { formatLargeNumber } from 'utils/formatLargeNumber';

export function resolveExperimentEntity(
  config: {
    experiment: number[];
    threshold: number[];
    simFunction: number[];
  },
  state: BenchmarkAppModel
): ExperimentEntity | undefined {
  const resolvedExperiment = state.resources.experiments.find(
    (anExperiment: Experiment): boolean =>
      anExperiment.id === config.experiment[0]
  );
  const resolvedSimilarityFunction = state.resources.simFunctions.find(
    (aSimFunction: SimilarityThresholdFunction): boolean =>
      aSimFunction.id === config.simFunction[0]
  );
  if (resolvedExperiment !== undefined) {
    if (resolvedSimilarityFunction !== undefined) {
      return {
        experiment: resolvedExperiment,
        similarity: {
          func: resolvedSimilarityFunction,
          threshold: config.threshold[0] ?? 0,
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

export function stringifyExperimentEntity({
  experiment,
  similarity,
}: ExperimentEntity): string {
  return (
    experiment.name +
    (similarity
      ? ` (${similarity.func.name} = ${formatLargeNumber(
          similarity.threshold
        )})`
      : '')
  );
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
