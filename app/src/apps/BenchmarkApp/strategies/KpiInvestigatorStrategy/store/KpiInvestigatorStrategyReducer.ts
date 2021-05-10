import { DiagramExperimentItem, MetricsEnum } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { KPIDiagramConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SoftKPIDiagramConfigurator';
import { KpiInvestigatorStrategyActionTypes } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyActionTypes';
import { KpiInvestigatorStrategyModel } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: KpiInvestigatorStrategyModel = {
  isValidConfig: true,
  diagramItems: [],
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
      const diagramItems = configuration.diagramTracks
        .filter(
          (aTrack): boolean =>
            aTrack.dataset[0] !== undefined &&
            aTrack.experiments[0].experiment[0] !== undefined &&
            aTrack.groundTruth[0] !== undefined
        )
        .map((aTrack): DiagramExperimentItem[] =>
          aTrack.experiments.map(
            (anEntity): DiagramExperimentItem => ({
              groundTruth: { experimentId: aTrack.groundTruth[0] },
              experiment: { experimentId: anEntity.experiment[0] },
            })
          )
        );
      return {
        ...state,
        diagramItems: diagramItems,
        isValidConfig: diagramItems.length > 0,
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
