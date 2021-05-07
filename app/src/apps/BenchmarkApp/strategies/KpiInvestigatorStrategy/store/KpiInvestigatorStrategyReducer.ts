import { MetricsEnum } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { KpiInvestigatorStrategyActionTypes } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyActionTypes';
import { KpiInvestigatorStrategyModel } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { MockDiagramExperimentItems } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/utils/mockDiagramExperimentItems';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: KpiInvestigatorStrategyModel = {
  isValidConfig: true,
  experimentItems: [],
  coordinates: [],
  selectedExperiment: [],
  xAxis: MetricsEnum.Precision,
  yAxis: MetricsEnum.Recall,
};

const KpiInvestigatorStrategyReducer = (
  state: KpiInvestigatorStrategyModel = initialState,
  action: SnowmanAction
): KpiInvestigatorStrategyModel => {
  switch (action.type) {
    case KpiInvestigatorStrategyActionTypes.UPDATE_CONFIG: {
      // Todo: Connect with store and retrieve from cache
      const retrievedExperimentItems = MockDiagramExperimentItems;
      return {
        ...state,
        experimentItems: retrievedExperimentItems,
        selectedExperiment: (action.payload as BenchmarkAppModel).resources
          .experiments,
        coordinates: [],
      };
    }
    case KpiInvestigatorStrategyActionTypes.SET_COORDINATES: {
      return { ...state, coordinates: action.payload as DiagramCoordinates[] };
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
