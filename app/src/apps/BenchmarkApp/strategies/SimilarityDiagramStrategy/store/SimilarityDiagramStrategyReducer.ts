import { MetricsEnum } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { KPIDiagramConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SoftKPIDiagramConfigurator';
import { SimilarityDiagramStrategyActionTypes } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyActionTypes';
import { SimilarityDiagramStrategyModel } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { DiagramTrack } from 'apps/BenchmarkApp/types/DiagramTrack';
import {
  experimentEntityFromConfig,
  experimentEntityToExperimentConfigItem,
} from 'apps/BenchmarkApp/utils/experimentEntity';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: SimilarityDiagramStrategyModel = {
  isValidConfig: false,
  diagramTracks: [],
  coordinates: [],
  experiments: [],
  yAxis: MetricsEnum.Precision,
  xAxis: MetricsEnum.Recall,
  definitionRange: undefined,
  valueRange: undefined,
};

const SimilarityDiagramStrategyReducer = (
  state: SimilarityDiagramStrategyModel = initialState,
  action: SnowmanAction
): SimilarityDiagramStrategyModel => {
  switch (action.type) {
    case SimilarityDiagramStrategyActionTypes.UPDATE_CONFIG: {
      const appStore = action.payload as BenchmarkAppModel;
      const configuration = KPIDiagramConfiguration.getValue(appStore);
      const diagramTracks: DiagramTrack[] = configuration.diagramTracks
        .filter((aTrack): boolean => aTrack.dataset[0] !== undefined)
        .flatMap((aTrack): DiagramTrack[] => {
          const groundTruthEntity = experimentEntityFromConfig(
            aTrack.groundTruth,
            appStore.resources
          );
          const groundTruth =
            groundTruthEntity !== undefined
              ? experimentEntityToExperimentConfigItem(groundTruthEntity)
              : undefined;
          return aTrack.experiments
            .map((entity) =>
              experimentEntityFromConfig(entity, appStore.resources)
            )
            .filter(
              (
                anEntity: ExperimentEntity | undefined
              ): anEntity is ExperimentEntity =>
                anEntity !== undefined &&
                anEntity.similarity !== undefined &&
                anEntity.similarity.func !== undefined
            )
            .map(
              (anEntity, index): DiagramTrack => ({
                name:
                  'Track ' +
                  (index + 1).toString() +
                  ' (' +
                  anEntity.experiment.name +
                  ', ' +
                  (anEntity.similarity?.func.name ?? '?') +
                  ')',
                items: [
                  {
                    groundTruth,
                    experiment: experimentEntityToExperimentConfigItem(
                      anEntity
                    ),
                  },
                ],
              })
            );
        })
        .filter((track) => track.items.length > 0);
      return {
        ...state,
        diagramTracks: diagramTracks,
        isValidConfig: diagramTracks.length > 0,
        experiments: (action.payload as BenchmarkAppModel).resources
          .experiments,
      };
    }
    case SimilarityDiagramStrategyActionTypes.SET_COORDINATES: {
      return {
        ...state,
        coordinates: action.payload as DiagramCoordinates[][],
        definitionRange: action.optionalPayload as [number, number] | undefined,
        valueRange: action.optionalPayload2 as [number, number] | undefined,
      };
    }
    case SimilarityDiagramStrategyActionTypes.SET_Y_AXIS: {
      return {
        ...state,
        yAxis: action.payload as AllMetricsEnum,
      };
    }
    case SimilarityDiagramStrategyActionTypes.SET_X_AXIS: {
      return {
        ...state,
        xAxis: action.payload as AllMetricsEnum,
      };
    }
    default:
      return state;
  }
};

export default SimilarityDiagramStrategyReducer;
