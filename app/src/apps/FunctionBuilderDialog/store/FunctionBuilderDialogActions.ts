import { ExperimentsApi, FileResponse, SimilarityThresholdsApi } from 'api';
import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import { FunctionBuilderDialogMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogStore';
import { FunctionBuilderDialogActionTypes } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogActionTypes';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import {
  CellDescriptor,
  FunctionBuildingBlockType,
  LeftRightCellContent,
  MidCellContent,
} from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { nth } from 'lodash';
import { max } from 'lodash';
import { MagicNotPossibleId } from 'structs/constants';
import { SUCCESS_TO_CREATE_NEW_SIMILARITY_THRESHOLD_FUNCTION } from 'structs/statusMessages';
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

export const createSimilarityThresholdFunction = (): SnowmanThunkAction<
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

export const onFunctionBuilderDialogOpen = (
  dispatch: SnowmanDispatch<FunctionBuilderDialogModel>
): void => {
  console.log('open');
  dispatch(loadExperimentColumns()).then();
};

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
}
