import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import { FunctionBuilderDialogActionTypes } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogActionTypes';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import {
  CellDescriptor,
  FunctionBuildingBlock,
} from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import UndefinedStrategy from 'apps/FunctionBuilderDialog/types/UndefinedStrategy';
import { produce } from 'immer';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: FunctionBuilderDialogModel = {
  operator: {
    type: SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
  },
  reservedAccessKeys: [RootAccessKey],
  functionBuildingStack: new FunctionBuildingBlock(
    RootAccessKey,
    UndefinedStrategy,
    null,
    null,
    null
  ),
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
    case FunctionBuilderDialogActionTypes.REGISTER_BUILDING_BLOCK: {
      return produce(
        state,
        (state: FunctionBuilderDialogModel): FunctionBuilderDialogModel => {
          const parentAccessKey = action.payload as number;
          state.functionBuildingStack.navigateToBlockAndMutate(
            parentAccessKey,
            (targetBlock: FunctionBuildingBlock): void => {
              const newBlock = new FunctionBuildingBlock(
                FunctionBuildingBlock.getNewAccessKey(state.reservedAccessKeys),
                UndefinedStrategy
              );
              if (
                (action.optionalPayload as CellDescriptor) ===
                CellDescriptor.left
              )
                targetBlock.left = newBlock;
              else targetBlock.right = newBlock;
            }
          );
          return state;
        }
      );
    }
    default:
      return state;
  }
};

export default FunctionBuilderDialogReducer;
