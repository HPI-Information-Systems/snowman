import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import { FunctionBuilderDialogActionTypes } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogActionTypes';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: FunctionBuilderDialogModel = {
  operator: {
    type: SimilarityThresholdFunctionDefinitionTypeEnum.Constant,
  },
  functionBuildingStack: {
    accessKey: RootAccessKey,
    type: UndefinedStrategy,
    left: null,
    mid: null,
    right: null,
  },
};

const FunctionBuilderDialogReducer = (
  state: FunctionBuilderDialogModel = initialState,
  action: SnowmanAction
): FunctionBuilderDialogModel => {
  switch (action.type) {
    case FunctionBuilderDialogActionTypes.SELECT_ROOT_TYPE: {
      if (
        (action.payload as SimilarityThresholdFunctionDefinitionTypeEnum) ===
        state.operator.type
      ) {
        return state;
      }
      return {
        ...state,
        operator: {
          type: action.payload as SimilarityThresholdFunctionDefinitionTypeEnum,
        },
      };
    }
    default:
      return state;
  }
};

export default FunctionBuilderDialogReducer;
