import { DiagramExperimentItem, MetricsEnum } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { KPIDiagramConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SoftKPIDiagramConfigurator';
import { KpiInvestigatorStrategyActionTypes } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyActionTypes';
import {
  DiagramTrack,
  KpiInvestigatorStrategyModel,
} from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: KpiInvestigatorStrategyModel = {
  isValidConfig: true,
  diagramTracks: [],
  coordinates: [],
  experiments: [],
  xAxis: MetricsEnum.Precision,
  yAxis: MetricsEnum.Recall,
};

const KpiInvestigatorStrategyReducer = (
  state: KpiInvestigatorStrategyModel = initialState,
  action: SnowmanAction
): KpiInvestigatorStrategyModel => {
  switch (action.type) {
    case KpiInvestigatorStrategyActionTypes.UPDATE_CONFIG: {
      const configuration = KPIDiagramConfiguration.getValue(
        action.payload as BenchmarkAppModel
      );
      const diagramTracks: DiagramTrack[] = configuration.diagramTracks
        .filter(
          (aTrack): boolean =>
            aTrack.dataset[0] !== undefined &&
            aTrack.experiments[0] !== undefined &&
            aTrack.experiments[0].experiment[0] !== undefined &&
            aTrack.groundTruth[0] !== undefined
        )
        .map(
          (aTrack, index): DiagramTrack => ({
            name:
              'Track ' +
              (index + 1).toString() +
              ' (' +
              ((action.payload as BenchmarkAppModel).resources.datasets.find(
                (aDataset): boolean => aDataset.id === aTrack.dataset[0]
              )?.name ?? '?') +
              ')',
            items: aTrack.experiments
              .filter(
                (anEntity): boolean => anEntity.experiment[0] !== undefined
              )
              .map(
                (anEntity): DiagramExperimentItem => ({
                  groundTruth: { experimentId: aTrack.groundTruth[0] },
                  experiment: {
                    experimentId: anEntity.experiment[0],
                    similarity:
                      anEntity.simFunction[0] !== undefined
                        ? {
                            func: anEntity.simFunction[0],
                            threshold: anEntity.threshold[0] ?? 0,
                          }
                        : undefined,
                  },
                })
              ),
          })
        );
      return {
        ...state,
        diagramTracks: diagramTracks,
        isValidConfig: diagramTracks.length > 0,
        experiments: (action.payload as BenchmarkAppModel).resources
          .experiments,
      };
    }
    case KpiInvestigatorStrategyActionTypes.SET_COORDINATES: {
      return {
        ...state,
        coordinates: action.payload as DiagramCoordinates[][],
      };
    }
    case KpiInvestigatorStrategyActionTypes.SET_X_AXIS: {
      return {
        ...state,
        xAxis: action.payload as AllMetricsEnum,
      };
    }
    case KpiInvestigatorStrategyActionTypes.SET_Y_AXIS: {
      return {
        ...state,
        yAxis: action.payload as AllMetricsEnum,
      };
    }
    default:
      return state;
  }
};

export default KpiInvestigatorStrategyReducer;
