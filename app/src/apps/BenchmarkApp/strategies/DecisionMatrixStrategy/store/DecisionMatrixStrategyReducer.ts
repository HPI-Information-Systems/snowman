import { Metric } from 'api';
import { DecisionMatrixConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/DecisionMatrixConfigurator';
import { DecisionMatrixStrategyActionTypes } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/DecisionMatrixStrategyActionTypes';
import { DecisionMatrixStrategyModel } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/DecisionMatrixStrategyModel';
import {
  MetricEntity,
  MetricEntityOptional,
} from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/MetricEntity';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { resolveExperimentEntity } from 'apps/BenchmarkApp/utils/experimentEntity';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: DecisionMatrixStrategyModel = {
  isValidConfig: false,
  selectedAlgorithms: [],
  metricEntities: [],
  metrics: [],
};

const DecisionMatrixStrategyReducer = (
  state: DecisionMatrixStrategyModel = initialState,
  action: SnowmanAction
): DecisionMatrixStrategyModel => {
  switch (action.type) {
    case DecisionMatrixStrategyActionTypes.UPDATE_CONFIG: {
      const appStore = action.payload as BenchmarkAppModel;
      const matrixConfig = DecisionMatrixConfiguration.getValue(appStore);
      const selectedAlgorithmIds = matrixConfig.algorithms.flat();
      const selectedAlgorithms = appStore.resources.algorithms.filter(
        (anAlgorithm): boolean => selectedAlgorithmIds.includes(anAlgorithm.id)
      );
      if (selectedAlgorithms.length === 0) return initialState;
      const metricEntities = matrixConfig.metrics.flatMap((aSegment) =>
        aSegment.experiments
          .map(
            (anExperiment): MetricEntityOptional => ({
              experiment: resolveExperimentEntity(anExperiment, appStore),
              groundTruthId: aSegment.groundTruth[0],
            })
          )
          .filter(
            (anEntity): anEntity is MetricEntity =>
              anEntity.experiment !== undefined
          )
      );
      return {
        ...initialState,
        isValidConfig: selectedAlgorithms.length > 0,
        selectedAlgorithms: selectedAlgorithms,
        metricEntities: metricEntities,
      };
    }
    case DecisionMatrixStrategyActionTypes.SET_METRICS: {
      const metrics = action.payload as Metric[][];
      if (state.metricEntities.length !== metrics.length) return state;
      return {
        ...state,
        metrics: metrics,
      };
    }
    default:
      return state;
  }
};

export default DecisionMatrixStrategyReducer;
