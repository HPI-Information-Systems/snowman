import { Dataset, ExperimentIntersectionCount, Metric } from 'api';
import { BinaryMetricsConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/BinaryMetricsConfigurator';
import { BinaryMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyActionTypes';
import { BinaryMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { resolveExperimentEntity } from 'apps/BenchmarkApp/utils/experimentEntity';
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
      const groundTruth = resolveExperimentEntity(
        configuration.groundTruth,
        appStore
      );
      const experiment = resolveExperimentEntity(
        configuration.experiment,
        appStore
      );
      const dataset = appStore.resources.datasets.find(
        (aDataset: Dataset): boolean => aDataset.id === configuration.dataset[0]
      );
      if (
        groundTruth === undefined ||
        experiment === undefined ||
        dataset === undefined
      ) {
        return {
          ...initialState,
          selectedDataView: state.selectedDataView,
        };
      }

      return {
        ...state,
        groundTruth,
        experiment,
        dataset,
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
