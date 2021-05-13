import { DiagramExperimentItem, MetricsEnum } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { KPIDiagramConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SoftKPIDiagramConfigurator';
import { SimilarityDiagramStrategyActionTypes } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyActionTypes';
import { SimilarityDiagramStrategyModel } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { DiagramTrack } from 'apps/BenchmarkApp/types/DiagramTrack';
import {
  experimentEntityToExperimentConfigItem,
  resolveExperimentEntity,
} from 'apps/BenchmarkApp/utils/experimentEntity';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: SimilarityDiagramStrategyModel = {
  isValidConfig: true,
  diagramTracks: [],
  coordinates: [],
  experiments: [],
  yAxis: MetricsEnum.Precision,
  xAxis: MetricsEnum.Recall,
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
        .map(
          (aTrack, index): DiagramTrack => {
            const groundTruthEntity = resolveExperimentEntity(
              aTrack.groundTruth,
              appStore
            );
            const groundTruth =
              groundTruthEntity !== undefined
                ? experimentEntityToExperimentConfigItem(groundTruthEntity)
                : undefined;
            return {
              name:
                'Track ' +
                (index + 1).toString() +
                ' (' +
                ((action.payload as BenchmarkAppModel).resources.datasets.find(
                  (aDataset): boolean => aDataset.id === aTrack.dataset[0]
                )?.name ?? '?') +
                ')',
              items: aTrack.experiments
                .map((entity) => resolveExperimentEntity(entity, appStore))
                .filter(
                  (
                    anEntity: ExperimentEntity | undefined
                  ): anEntity is ExperimentEntity => anEntity !== undefined
                )
                .map(
                  (anEntity): DiagramExperimentItem => {
                    return {
                      groundTruth,
                      experiment: experimentEntityToExperimentConfigItem(
                        anEntity
                      ),
                    };
                  }
                ),
            };
          }
        )
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
