import { Dataset, Experiment, ExperimentIntersectionCount, Metric } from 'api';
import { BinaryMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyActionTypes';
import { BinaryMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StoreCacheKey } from 'apps/BenchmarkApp/types/CacheBaseKeyEnum';
import { getSingleItem } from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: BinaryMetricsStrategyModel = {
  isValidConfig: false,
  experiment: undefined,
  goldStandard: undefined,
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
      const appConfig = appStore.config;
      const datasetId = getSingleItem(
        StoreCacheKey.dataset,
        appConfig.datasets
      );
      const goldStandardId = getSingleItem(
        StoreCacheKey.groundTruth,
        appConfig.experiments
      );
      const experimentId = getSingleItem(
        StoreCacheKey.experiment,
        appConfig.experiments
      );
      if (
        datasetId === undefined ||
        goldStandardId === undefined ||
        experimentId === undefined
      )
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
        experiment: appStore.resources.experiments.find(
          (anExperiment: Experiment): boolean =>
            anExperiment.id === experimentId
        ),
        dataset: appStore.resources.datasets.find(
          (aDataset: Dataset): boolean => aDataset.id === datasetId
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
