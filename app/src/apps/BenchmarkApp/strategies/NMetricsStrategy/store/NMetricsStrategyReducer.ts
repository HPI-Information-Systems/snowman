import { Experiment, Metric } from 'api';
import { NMetricsConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/NMetricsConfigurator';
import { NMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyActionTypes';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
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
      const appStore = action.payload as BenchmarkAppModel;
      const configuration = NMetricsConfiguration.getValue(appStore);
      const goldStandardId = configuration.groundTruth[0];
      const experimentIds = configuration.experiments.flat();
      if (goldStandardId === undefined || experimentIds.length === 0)
        return {
          ...state,
          isValidConfig: false,
        };
      return {
        ...state,
        goldStandard: appStore.resources.experiments.find(
          (anExperiment: Experiment): boolean =>
            anExperiment.id === goldStandardId
        ),
        experiments: appStore.resources.experiments.filter(
          (anExperiment: Experiment): boolean =>
            experimentIds.includes(anExperiment.id)
        ),
        metrics: [],
        isValidConfig: true,
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
