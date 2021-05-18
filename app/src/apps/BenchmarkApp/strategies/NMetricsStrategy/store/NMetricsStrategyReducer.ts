import { Metric } from 'api';
import { NMetricsConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/NMetricsConfigurator';
import { NMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyActionTypes';
import { NMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/types/NMetricsStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { experimentEntityFromConfig } from 'apps/BenchmarkApp/utils/experimentEntity';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: NMetricsStrategyModel = {
  experiments: [],
  groundTruth: undefined,
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
      const groundTruth = experimentEntityFromConfig(
        configuration.groundTruth,
        appStore.resources
      );
      const experiments = configuration.experiments
        .map((config) => experimentEntityFromConfig(config, appStore.resources))
        .filter(
          (entity: ExperimentEntity | undefined): entity is ExperimentEntity =>
            entity !== undefined
        );
      if (groundTruth === undefined || experiments.length === 0) {
        return initialState;
      }
      return {
        ...state,
        groundTruth,
        experiments,
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
