import { Metric } from 'api';
import { DecisionMatrixConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/DecisionMatrixConfigurator';
import { DecisionMatrixStrategyActionTypes } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/DecisionMatrixStrategyActionTypes';
import { DecisionMatrixStrategyModel } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/DecisionMatrixStrategyModel';
import { EnhancedAlgorithm } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/EnhancedAlgorithm';
import {
  MetricEntity,
  MetricEntityOptional,
} from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/MetricEntity';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { resolveExperimentEntity } from 'apps/BenchmarkApp/utils/experimentEntity';
import { groupBy } from 'lodash';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: DecisionMatrixStrategyModel = {
  isValidConfig: false,
  averageMetrics: [],
  enhancedAlgorithms: [],
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
      const selectedExperiments = matrixConfig.metrics.flatMap((aSegment) =>
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
      const groupedExperiments = groupBy(
        selectedExperiments,
        (anEntity): number => anEntity.experiment.experiment.algorithmId
      );
      const enhancedAlgorithms = selectedAlgorithms.map(
        (anAlgorithm): EnhancedAlgorithm => ({
          algorithm: anAlgorithm,
          metricEntities: groupedExperiments[anAlgorithm.id] ?? [],
        })
      );
      return {
        ...initialState,
        isValidConfig: selectedAlgorithms.length > 0,
        enhancedAlgorithms: enhancedAlgorithms,
      };
    }
    case DecisionMatrixStrategyActionTypes.SET_METRICS: {
      const metrics = action.payload as Metric[][];
      if (state.enhancedAlgorithms.length !== metrics.length) return state;
      return {
        ...state,
        averageMetrics: metrics,
      };
    }
    default:
      return state;
  }
};

export default DecisionMatrixStrategyReducer;
