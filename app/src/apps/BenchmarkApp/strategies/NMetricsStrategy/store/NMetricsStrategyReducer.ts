import { Experiment, Metric } from 'api';
import { NMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyActionTypes';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { BenchmarkAppConfigStore } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { GoldStandardId } from 'snowman-library';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: NMetricsStrategyModel = {
  experiments: [],
  goldStandard: undefined,
  metrics: [],
  isValidConfig: false,
};

const NMetricsStrategyReducer = (
  state: NMetricsStrategyModel = initialState,
  action: SnowmanAction
): NMetricsStrategyModel => {
  switch (action.type) {
    case NMetricsStrategyActionTypes.UPDATE_CONFIG: {
      const config = action.payload as BenchmarkAppConfigStore;
      const selectedExperiments = config.experiments.filter(
        (anExperiment: Experiment): boolean =>
          config.selectedExperimentIds.includes(anExperiment.id)
      );
      const goldStandard = selectedExperiments.filter(
        (anExperiment: Experiment): boolean =>
          anExperiment.algorithmId === GoldStandardId
      )[0];
      const currentExperiments =
        goldStandard !== undefined
          ? selectedExperiments.filter(
              (anExperiment: Experiment): boolean =>
                anExperiment.algorithmId !== GoldStandardId &&
                goldStandard.datasetId === anExperiment.datasetId
            )
          : [];
      return {
        ...state,
        experiments: currentExperiments,
        goldStandard: goldStandard,
        isValidConfig:
          currentExperiments.length > 0 && goldStandard !== undefined,
      };
    }
    case NMetricsStrategyActionTypes.SET_METRICS:
      return {
        ...state,
        metrics: action.payload as Metric[][],
      };
    case NMetricsStrategyActionTypes.RESET_METRICS:
      return {
        ...state,
        metrics: [],
      };
    default:
      return state;
  }
};

export default NMetricsStrategyReducer;
