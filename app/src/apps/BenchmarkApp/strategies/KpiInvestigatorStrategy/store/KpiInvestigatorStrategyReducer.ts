import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { KpiInvestigatorStrategyActionTypes } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyActionTypes';
import { KpiInvestigatorStrategyModel } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { MockDiagramExperimentItems } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/utils/mockDiagramExperimentItems';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: KpiInvestigatorStrategyModel = {
  isValidConfig: true,
  experimentItems: [],
  coordinates: [],
  selectedExperiment: [],
};

const KpiInvestigatorStrategyReducer = (
  state: KpiInvestigatorStrategyModel = initialState,
  action: SnowmanAction
): KpiInvestigatorStrategyModel => {
  switch (action.type) {
    case KpiInvestigatorStrategyActionTypes.UPDATE_CONFIG: {
      return {
        ...state,
        experimentItems: MockDiagramExperimentItems,
        selectedExperiment: (action.payload as BenchmarkAppModel).resources
          .experiments,
        coordinates: [],
      };
    }
    case KpiInvestigatorStrategyActionTypes.SET_COORDINATES: {
      return { ...state, coordinates: action.payload as DiagramCoordinates[] };
    }
    default:
      return state;
  }
};

export default KpiInvestigatorStrategyReducer;
