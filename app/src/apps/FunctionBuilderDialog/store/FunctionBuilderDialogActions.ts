import {
  ExperimentsApi,
  FileResponse,
  SimilarityThresholdFunction,
  SimilarityThresholdsApi,
} from 'api';
import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import { FunctionBuilderDialogMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogStore';
import { FunctionBuilderDialogActionTypes } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogActionTypes';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import {
  CellDescriptor,
  FunctionBuildingBlock,
  FunctionBuildingBlockType,
  LeftRightCellContent,
  MidCellContent,
} from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { max, nth } from 'lodash';
import { MagicNotPossibleId } from 'structs/constants';
import { SUCCESS_TO_CREATE_NEW_SIMILARITY_THRESHOLD_FUNCTION } from 'structs/statusMessages';
import { EntityId } from 'types/EntityId';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

const getExperimentId = (): number =>
  nth(
    SnowmanAppMagistrate.getStore().getState().RenderLogicStore.dialogStack,
    1
  )?.entityId ?? MagicNotPossibleId;

const createSimilarityThresholdFunction = (): SnowmanThunkAction<
  void,
  FunctionBuilderDialogModel
> => (
  _: SnowmanDispatch<FunctionBuilderDialogModel>,
  getState: () => FunctionBuilderDialogModel
): void => {
  RequestHandler<number>(
    (): Promise<number> =>
      new SimilarityThresholdsApi().addSimilarityThresholdFunction({
        similarityThresholdFunction: {
          name: getState().functionName,
          experimentId: getExperimentId(),
          definition: getState().functionBuildingStack.getFunctionDefinition(),
        },
      }),
    SUCCESS_TO_CREATE_NEW_SIMILARITY_THRESHOLD_FUNCTION
  ).then((): void => doCloseDialog());
};

const updateSimilarityThresholdFunction = (
  functionId: number
): SnowmanThunkAction<void, FunctionBuilderDialogModel> => (
  _: SnowmanDispatch<FunctionBuilderDialogModel>,
  getState: () => FunctionBuilderDialogModel
): void => {
  RequestHandler<void>(
    (): Promise<void> =>
      new SimilarityThresholdsApi().setSimilarityThresholdFunction({
        functionId: functionId,
        similarityThresholdFunction: {
          name: getState().functionName,
          definition: getState().functionBuildingStack.getFunctionDefinition(),
          experimentId: getExperimentId(),
        },
      }),
    SUCCESS_TO_CREATE_NEW_SIMILARITY_THRESHOLD_FUNCTION
  ).then((): void => doCloseDialog());
};

export const createOrUpdateSimilarityThresholdFunction = (
  functionId: EntityId
): SnowmanThunkAction<void, FunctionBuilderDialogModel> => (
  dispatch: SnowmanDispatch<FunctionBuilderDialogModel>
): void => {
  if (functionId === null) return dispatch(createSimilarityThresholdFunction());
  return dispatch(updateSimilarityThresholdFunction(functionId));
};

const loadExperimentColumns = (): SnowmanThunkAction<
  Promise<void>,
  FunctionBuilderDialogModel
> => (dispatch: SnowmanDispatch<FunctionBuilderDialogModel>): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new ExperimentsApi()
        .getExperimentFile({
          experimentId: getExperimentId(),
          // an arbitrary number so that not all records will be loaded
          limit: 5,
        })
        .then((file: FileResponse): void => {
          dispatch({
            type: FunctionBuilderDialogActionTypes.LOAD_EXPERIMENT_COLUMNS,
            payload: file.header,
          });
        })
  );

const prepareUpdateDialog = (
  functionId: EntityId
): SnowmanThunkAction<Promise<void>, FunctionBuilderDialogModel> => (
  dispatch: SnowmanDispatch<FunctionBuilderDialogModel>
): Promise<void> =>
  RequestHandler<void>(
    (): Promise<void> =>
      new SimilarityThresholdsApi()
        .getSimilarityThresholdFunction({
          functionId: functionId ?? MagicNotPossibleId,
        })
        .then((similarityFunction: SimilarityThresholdFunction): [
          FunctionBuildingBlock,
          number[],
          string
        ] => [
          ...FunctionBuildingBlock.getFBBFromAPISimilarityFunction(
            similarityFunction
          ),
          similarityFunction.name,
        ])
        .then(
          (anUpdateInfo: [FunctionBuildingBlock, number[], string]): void => {
            dispatch({
              type: FunctionBuilderDialogActionTypes.CHANGE_FUNCTION_NAME,
              payload: anUpdateInfo[2],
            });
            dispatch({
              type:
                FunctionBuilderDialogActionTypes.SUBSTITUTE_RESERVED_ACCESS_KEYS,
              payload: anUpdateInfo[1],
            });
            dispatch({
              type:
                FunctionBuilderDialogActionTypes.SUBSTITUTE_FUNCTION_BUILDING_BLOCK,
              payload: anUpdateInfo[0],
            });
          }
        )
  );

export const loadInitialState = (
  dispatch: SnowmanDispatch<FunctionBuilderDialogModel>,
  entityId: EntityId
): void => {
  dispatch(resetDialog());
  if (entityId !== null) dispatch(prepareUpdateDialog(entityId)).then();
  dispatch(loadExperimentColumns()).then();
};

export const resetDialog = (): easyPrimitiveActionReturn<FunctionBuilderDialogModel> =>
  easyPrimitiveAction<FunctionBuilderDialogModel>({
    type: FunctionBuilderDialogActionTypes.RESET_DIALOG,
    // reducer ignores payload
    payload: false,
  });

export const changeFunctionName = (
  newFunctionName: string
): easyPrimitiveActionReturn<FunctionBuilderDialogModel> =>
  easyPrimitiveAction<FunctionBuilderDialogModel>({
    type: FunctionBuilderDialogActionTypes.CHANGE_FUNCTION_NAME,
    payload: newFunctionName,
  });

export class FunctionBuildingBlockMagistrate {
  private static dispatch: SnowmanDispatch<FunctionBuilderDialogModel> = FunctionBuilderDialogMagistrate.getStore()
    .dispatch as SnowmanDispatch<FunctionBuilderDialogModel>;

  private static getNewAccessKeyAction(): SnowmanThunkAction<
    number,
    FunctionBuilderDialogModel
  > {
    return function (
      dispatch: SnowmanDispatch<FunctionBuilderDialogModel>,
      getState: () => FunctionBuilderDialogModel
    ): number {
      const newKey = (max(getState().reservedAccessKeys) ?? RootAccessKey) + 1;
      dispatch({
        type: FunctionBuilderDialogActionTypes.REGISTER_NEW_ACCESS_KEY,
        payload: newKey,
      });
      return newKey;
    };
  }

  static getNewAccessKey(): number {
    return FunctionBuildingBlockMagistrate.dispatch(
      FunctionBuildingBlockMagistrate.getNewAccessKeyAction()
    );
  }

  private static registerBuildingBlockAction(
    ownAccessKey: number,
    parentAccessKey: number | null,
    cellDescriptor: CellDescriptor
  ): SnowmanThunkAction<void, FunctionBuilderDialogModel> {
    return function (
      dispatch: SnowmanDispatch<FunctionBuilderDialogModel>
    ): void {
      dispatch({
        type: FunctionBuilderDialogActionTypes.REGISTER_BUILDING_BLOCK,
        payload: ownAccessKey,
        optionalPayload: parentAccessKey,
        optionalPayload2: cellDescriptor,
      });
    };
  }

  static registerBuildingBlock(
    ownAccessKey: number,
    parentAccessKey: number | null,
    cellDescriptor: CellDescriptor
  ): void {
    return FunctionBuildingBlockMagistrate.dispatch(
      FunctionBuildingBlockMagistrate.registerBuildingBlockAction(
        ownAccessKey,
        parentAccessKey,
        cellDescriptor
      )
    );
  }

  private static unregisterBuildingBlockAction(
    ownAccessKey: number
  ): SnowmanThunkAction<void, FunctionBuilderDialogModel> {
    return function (
      dispatch: SnowmanDispatch<FunctionBuilderDialogModel>
    ): void {
      dispatch({
        type: FunctionBuilderDialogActionTypes.UNREGISTER_BUILDING_BLOCK,
        payload: ownAccessKey,
      });
    };
  }

  static unregisterBuildingBlock(ownAccessKey: number): void {
    FunctionBuildingBlockMagistrate.dispatch(
      FunctionBuildingBlockMagistrate.unregisterBuildingBlockAction(
        ownAccessKey
      )
    );
  }

  static chooseStrategyAction(
    ownAccessKey: number,
    targetStrategy: FunctionBuildingBlockType
  ): SnowmanThunkAction<void, FunctionBuilderDialogModel> {
    return function (
      dispatch: SnowmanDispatch<FunctionBuilderDialogModel>
    ): void {
      dispatch({
        type: FunctionBuilderDialogActionTypes.CHOOSE_STRATEGY,
        payload: ownAccessKey,
        optionalPayload: targetStrategy,
      });
    };
  }

  static chooseStrategy(
    ownAccessKey: number,
    targetStrategy: FunctionBuildingBlockType
  ): void {
    FunctionBuildingBlockMagistrate.dispatch(
      FunctionBuildingBlockMagistrate.chooseStrategyAction(
        ownAccessKey,
        targetStrategy
      )
    );
  }

  private static setLeftValueAction(
    ownAccessKey: number,
    value: LeftRightCellContent
  ): SnowmanThunkAction<void, FunctionBuilderDialogModel> {
    return function (dispatch: SnowmanDispatch<FunctionBuilderDialogModel>) {
      dispatch({
        type: FunctionBuilderDialogActionTypes.SET_LEFT_VALUE,
        payload: ownAccessKey,
        optionalPayload: value,
      });
    };
  }

  static setLeftValue(ownAccessKey: number, value: LeftRightCellContent): void {
    FunctionBuildingBlockMagistrate.dispatch(
      FunctionBuildingBlockMagistrate.setLeftValueAction(ownAccessKey, value)
    );
  }

  private static setRightValueAction(
    ownAccessKey: number,
    value: LeftRightCellContent
  ): SnowmanThunkAction<void, FunctionBuilderDialogModel> {
    return function (dispatch: SnowmanDispatch<FunctionBuilderDialogModel>) {
      dispatch({
        type: FunctionBuilderDialogActionTypes.SET_RIGHT_VALUE,
        payload: ownAccessKey,
        optionalPayload: value,
      });
    };
  }

  static setRightValue(
    ownAccessKey: number,
    value: LeftRightCellContent
  ): void {
    FunctionBuildingBlockMagistrate.dispatch(
      FunctionBuildingBlockMagistrate.setRightValueAction(ownAccessKey, value)
    );
  }

  private static setMidValueAction(
    ownAccessKey: number,
    value: MidCellContent
  ): SnowmanThunkAction<void, FunctionBuilderDialogModel> {
    return function (dispatch: SnowmanDispatch<FunctionBuilderDialogModel>) {
      dispatch({
        type: FunctionBuilderDialogActionTypes.SET_MID_VALUE,
        payload: ownAccessKey,
        optionalPayload: value,
      });
    };
  }

  static setMidValue(ownAccessKey: number, value: MidCellContent): void {
    return FunctionBuildingBlockMagistrate.dispatch(
      FunctionBuildingBlockMagistrate.setMidValueAction(ownAccessKey, value)
    );
  }

  private static doesAnBlockAlreadyExistsAction(
    parentAccessKey: number,
    location: CellDescriptor
  ): SnowmanThunkAction<boolean, FunctionBuilderDialogModel> {
    return function (
      _: SnowmanDispatch<FunctionBuilderDialogModel>,
      getState: () => FunctionBuilderDialogModel
    ): boolean {
      const targetBlock = getState().functionBuildingStack.getBlock(
        parentAccessKey
      );
      if (targetBlock === undefined) return false;
      switch (location) {
        case CellDescriptor.left:
          return targetBlock.left !== undefined && targetBlock.left !== null;
        case CellDescriptor.right:
          return targetBlock.right !== undefined && targetBlock.right !== null;
        case CellDescriptor.mid:
          return targetBlock.mid !== undefined && targetBlock.mid !== null;
      }
    };
  }

  static doesAnBlockAlreadyExists(
    parentAccessKey: number,
    location: CellDescriptor
  ): boolean {
    return FunctionBuildingBlockMagistrate.dispatch(
      FunctionBuildingBlockMagistrate.doesAnBlockAlreadyExistsAction(
        parentAccessKey,
        location
      )
    );
  }

  private static getAccessKeyOfExistingChildBlockAction(
    parentAccessKey: number,
    location: CellDescriptor
  ): SnowmanThunkAction<number, FunctionBuilderDialogModel> {
    return function (
      _dispatch: SnowmanDispatch<FunctionBuilderDialogModel>,
      getState: () => FunctionBuilderDialogModel
    ): number {
      const targetBlock = getState().functionBuildingStack.getBlock(
        parentAccessKey
      );
      if (targetBlock === null || targetBlock === undefined)
        throw Error('Impossible to retrieve access key from undef child');
      switch (location) {
        case CellDescriptor.left: {
          if (
            targetBlock.left === null ||
            targetBlock.left === undefined ||
            !(targetBlock.left instanceof FunctionBuildingBlock)
          )
            throw Error('Impossible to retrieve access key from undef child');
          return targetBlock.left.accessKey;
        }
        case CellDescriptor.right: {
          if (
            targetBlock.right === null ||
            targetBlock.right === undefined ||
            !(targetBlock.right instanceof FunctionBuildingBlock)
          )
            throw Error('Impossible to retrieve access key from undef child');
          return targetBlock.right.accessKey;
        }
        default:
          throw Error(
            'FunctionBuildingBlocks could not exist at given location'
          );
      }
    };
  }

  static getAccessKeyOfExistingChildBlock(
    parentAccessKey: number,
    location: CellDescriptor
  ): number {
    return FunctionBuildingBlockMagistrate.dispatch(
      FunctionBuildingBlockMagistrate.getAccessKeyOfExistingChildBlockAction(
        parentAccessKey,
        location
      )
    );
  }
}
