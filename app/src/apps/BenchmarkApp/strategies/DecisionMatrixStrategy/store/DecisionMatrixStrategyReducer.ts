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
    case DecisionMatrixStrategyActionTypes.UPDATE_CONFIG:
      return {
        isValidConfig: true,
        selectedAlgorithms: (action.payload as BenchmarkAppModel).resources.algorithms.filter(
          (anAlgorithm): boolean => anAlgorithm.id > -1
        ),
      };
    default:
      return state;
  }
};

export default DecisionMatrixStrategyReducer;
