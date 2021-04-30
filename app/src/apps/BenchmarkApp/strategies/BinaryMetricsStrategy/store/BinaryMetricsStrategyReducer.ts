import { Experiment, ExperimentIntersectionCount, Metric } from 'api';
import { BinaryMetricsStrategyActionTypes } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyActionTypes';
import { BinaryMetricsStrategyModel } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/types/BinaryMetricsStrategyModel';
import { BenchmarkAppConfigStore } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { GoldStandardId } from 'snowman-library';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: BinaryMetricsStrategyModel = {
  isValidConfig: false,
  experiment: undefined,
  goldStandard: undefined,
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
      const config = action.payload as BenchmarkAppConfigStore;
      const selectedExperiments = config.experiments.filter(
        (anExperiment: Experiment): boolean =>
          config.selectedExperimentIds.includes(anExperiment.id)
      );
      const goldStandards = selectedExperiments.filter(
        (anExperiment: Experiment): boolean =>
          anExperiment.algorithmId === GoldStandardId
      );
      if (goldStandards.length !== 1 || selectedExperiments.length !== 2) {
        return {
          ...state,
          isValidConfig: false,
        };
      }
      const goldStandard = goldStandards[0];
      const currentExperiments = selectedExperiments.filter(
        (anExperiment: Experiment): boolean =>
          anExperiment.id !== goldStandard.id &&
          anExperiment.datasetId === goldStandard.datasetId
      );
      if (currentExperiments.length !== 1) {
        return {
          ...state,
          isValidConfig: false,
        };
      }
      return {
        ...state,
        isValidConfig: true,
        metrics: [],
        counts: [],
        goldStandard: goldStandard,
        experiment: currentExperiments[0],
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
