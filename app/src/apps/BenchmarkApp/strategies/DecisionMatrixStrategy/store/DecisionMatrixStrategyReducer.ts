import { DecisionMatrixConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/DecisionMatrixConfigurator';
import { DecisionMatrixStrategyActionTypes } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/DecisionMatrixStrategyActionTypes';
import { DecisionMatrixStrategyModel } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/types/DecisionMatrixStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: DecisionMatrixStrategyModel = {
  isValidConfig: false,
  selectedAlgorithms: [],
};

const DecisionMatrixStrategyReducer = (
  state: DecisionMatrixStrategyModel = initialState,
  action: SnowmanAction
): DecisionMatrixStrategyModel => {
  switch (action.type) {
    case DecisionMatrixStrategyActionTypes.UPDATE_CONFIG: {
      const appStore = action.payload as BenchmarkAppModel;
      const selectedAlgorithmIds = DecisionMatrixConfiguration.getValue(
        appStore
      ).algorithms.flat();
      const selectedAlgorithms = appStore.resources.algorithms.filter(
        (anAlgorithm): boolean => selectedAlgorithmIds.includes(anAlgorithm.id)
      );
      return {
        isValidConfig: selectedAlgorithms.length > 0,
        selectedAlgorithms: selectedAlgorithms,
      };
    }
    default:
      return state;
  }
};

export default DecisionMatrixStrategyReducer;
