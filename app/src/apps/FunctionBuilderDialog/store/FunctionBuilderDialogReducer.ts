import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import { FunctionBuilderDialogActionTypes } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogActionTypes';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import {
  CellDescriptor,
  FunctionBuildingBlock,
  FunctionBuildingBlockType,
  LeftRightCellContent,
  MidCellContent,
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
    case FunctionBuilderDialogActionTypes.REGISTER_NEW_ACCESS_KEY:
      return {
        ...state,
        reservedAccessKeys: [
          ...state.reservedAccessKeys,
          action.payload as number,
        ],
      };
    case FunctionBuilderDialogActionTypes.REGISTER_BUILDING_BLOCK: {
      return produce(
        state,
        (state: FunctionBuilderDialogModel): FunctionBuilderDialogModel => {
          const ownAccessKey = action.payload as number;
          const parentAccessKey = action.optionalPayload as number | null;
          const targetCell = action.optionalPayload2 as CellDescriptor;
          if (parentAccessKey === null) return state;
          state.functionBuildingStack.navigateToBlockAndMutate(
            parentAccessKey ?? RootAccessKey,
            (targetBlock: FunctionBuildingBlock): void => {
              const newBlock = new FunctionBuildingBlock(
                ownAccessKey,
                UndefinedStrategy
              );
              if (targetCell === CellDescriptor.left)
                targetBlock.left = newBlock;
              else targetBlock.right = newBlock;
            }
          );
          return state;
        }
      );
    }
    case FunctionBuilderDialogActionTypes.UNREGISTER_BUILDING_BLOCK: {
      if ((action.payload as number) === RootAccessKey) return initialState;
      return produce(
        state,
        (state: FunctionBuilderDialogModel): FunctionBuilderDialogModel => {
          state.functionBuildingStack.removeBlock(action.payload as number);
          return {
            ...state,
            reservedAccessKeys: state.reservedAccessKeys.filter(
              (anKey: number): boolean => anKey !== (action.payload as number)
            ),
          };
        }
      );
    }
    case FunctionBuilderDialogActionTypes.CHOOSE_STRATEGY: {
      return produce(
        state,
        (state: FunctionBuilderDialogModel): FunctionBuilderDialogModel => {
          const targetBlockKey = action.payload as number;
          const targetStrategy = action.optionalPayload as FunctionBuildingBlockType;
          state.functionBuildingStack.navigateToBlockAndMutate(
            targetBlockKey,
            (targetBlock: FunctionBuildingBlock): void => {
              targetBlock.type = targetStrategy;
            }
          );
          return state;
        }
      );
    }
    case FunctionBuilderDialogActionTypes.SET_MID_VALUE: {
      return produce(
        state,
        (state: FunctionBuilderDialogModel): FunctionBuilderDialogModel => {
          const targetBlockKey = action.payload as number;
          state.functionBuildingStack.navigateToBlockAndMutate(
            targetBlockKey,
            (targetBlock: FunctionBuildingBlock): void => {
              targetBlock.mid = action.optionalPayload as MidCellContent;
            }
          );
          return state;
        }
      );
    }
    case FunctionBuilderDialogActionTypes.SET_LEFT_VALUE: {
      return produce(
        state,
        (state: FunctionBuilderDialogModel): FunctionBuilderDialogModel => {
          const targetBlockKey = action.payload as number;
          state.functionBuildingStack.navigateToBlockAndMutate(
            targetBlockKey,
            (targetBlock: FunctionBuildingBlock): void => {
              targetBlock.left = action.optionalPayload as LeftRightCellContent;
            }
          );
          return state;
        }
      );
    }
    case FunctionBuilderDialogActionTypes.SET_RIGHT_VALUE: {
      return produce(
        state,
        (state: FunctionBuilderDialogModel): FunctionBuilderDialogModel => {
          const targetBlockKey = action.payload as number;
          state.functionBuildingStack.navigateToBlockAndMutate(
            targetBlockKey,
            (targetBlock: FunctionBuildingBlock): void => {
              targetBlock.right = action.optionalPayload as LeftRightCellContent;
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
