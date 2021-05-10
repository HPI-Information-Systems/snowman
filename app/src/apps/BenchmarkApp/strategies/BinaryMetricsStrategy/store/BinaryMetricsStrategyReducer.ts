import { Dataset, Experiment, ExperimentIntersectionCount, Metric } from 'api';
import { BinaryMetricsConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/BinaryMetricsConfigurator';
import { BinaryMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyActionTypes';
import { BinaryMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: BinaryMetricsStrategyModel = {
  isValidConfig: false,
  experiment: undefined,
  groundTruth: undefined,
  dataset: undefined,
  metrics: [],
  counts: [],
  selectedDataView: MetricsTuplesCategories.truePositives,
};

const BinaryMetricsStrategyReducer = (
  state: BinaryMetricsStrategyModel = initialState,
  action: SnowmanAction
): BinaryMetricsStrategyModel => {
  switch (action.type) {
    case BinaryMetricsStrategyActionTypes.UPDATE_CONFIG: {
      const appStore = action.payload as BenchmarkAppModel;
      const configuration = BinaryMetricsConfiguration.getValue(appStore);
      if (
        configuration.dataset[0] === undefined ||
        configuration.groundTruth[0] === undefined ||
        configuration.experiment[0] === undefined
      ) {
        return {
          ...state,
          isValidConfig: false,
        };
      }

      const foundGroundTruth = appStore.resources.experiments.find(
        (anExperiment: Experiment): boolean =>
          anExperiment.id === configuration.groundTruth[0]
      );
      const foundExperiment = appStore.resources.experiments.find(
        (anExperiment: Experiment): boolean =>
          anExperiment.id === configuration.experiment[0]
      );
      if (foundGroundTruth === undefined || foundExperiment === undefined) {
        return {
          ...state,
          isValidConfig: false,
        };
      }

      return {
        ...state,
        groundTruth: {
          experiment: foundGroundTruth,
        },
        experiment: {
          experiment: foundExperiment,
        },
        dataset: appStore.resources.datasets.find(
          (aDataset: Dataset): boolean =>
            aDataset.id === configuration.dataset[0]
        ),
        isValidConfig: true,
        metrics: [],
        counts: [],
      };
    }
    case BinaryMetricsStrategyActionTypes.RESET_METRICS:
      return {
        ...state,
        metrics: [],
      };
    case BinaryMetricsStrategyActionTypes.SET_ALL_METRICS:
      return {
        ...state,
        metrics: action.payload as Metric[],
      };
    case BinaryMetricsStrategyActionTypes.SET_ALL_COUNTS:
      return {
        ...state,
        counts: action.payload as ExperimentIntersectionCount[],
      };
    case BinaryMetricsStrategyActionTypes.CLICK_ON_PANE:
      return {
        ...state,
        selectedDataView: action.payload as MetricsTuplesCategories,
      };
    default:
      return state;
  }
};

export default BinaryMetricsStrategyReducer;
