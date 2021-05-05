import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import { FunctionBuilderDialogActionTypes } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogActionTypes';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: FunctionBuilderDialogModel = {
  operator: {
    type: SimilarityThresholdFunctionDefinitionTypeEnum.Constant,
  },
  functionElementFields: [],
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
        functionElementFields: [],
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
