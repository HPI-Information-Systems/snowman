import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionValuesTypeEnum,
  SimilarityThresholdsApi,
} from 'api';
import RootAccessKey from 'apps/FunctionBuilderDialog/components/StrategyMapper/RootAccessKey';
import { FunctionBuilderDialogMagistrate } from 'apps/FunctionBuilderDialog/store/FunctionBuilderDialogStore';
import { FunctionBuilderDialogActionTypes } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogActionTypes';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import autoBind from 'auto-bind';
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
> => (): void => {
  console.log(getExperimentId());
  RequestHandler<number>(
    (): Promise<number> =>
      new SimilarityThresholdsApi().addSimilarityThresholdFunction({
        experimentId: getExperimentId(),
        similarityThresholdFunction: {
          name: 'New SimFunc',
          type: SimilarityThresholdFunctionValuesTypeEnum.Constant,
          constant: 4,
        },
      }),
    SUCCESS_TO_CREATE_NEW_SIMILARITY_THRESHOLD_FUNCTION
  ).then((): void => doCloseDialog());
};

export const selectRootFunctionType = (
  aType: SimilarityThresholdFunctionDefinitionTypeEnum
): easyPrimitiveActionReturn<FunctionBuilderDialogModel> =>
  easyPrimitiveAction<FunctionBuilderDialogModel>({
    type: FunctionBuilderDialogActionTypes.SELECT_ROOT_TYPE,
    payload: aType,
  });

export const getOwnFunctionBuildingBlock = (
  accessKey: number
): SnowmanThunkAction<number, FunctionBuilderDialogModel> => (
  _: SnowmanDispatch<FunctionBuilderDialogModel>,
  getState: () => FunctionBuilderDialogModel
): number => {
  return 4;
};

class FunctionBuildingBlockKeyMagistrate {
  dispatch: SnowmanDispatch<FunctionBuilderDialogModel>;

  constructor() {
    autoBind(this);
    this.dispatch = FunctionBuilderDialogMagistrate.getStore()
      .dispatch as SnowmanDispatch<FunctionBuilderDialogModel>;
  }

  getNewAccessKeyAction(): SnowmanThunkAction<
    number,
    FunctionBuilderDialogModel
  > {
    return function (
      _: SnowmanDispatch<FunctionBuilderDialogModel>,
      getState: () => FunctionBuilderDialogModel
    ): number {
      return (max(getState().reservedAccessKeys) ?? RootAccessKey) + 1;
    };
  }

  getNewAccessKey(): number {
    return this.dispatch(this.getNewAccessKeyAction());
  }
}

const FunctionBuildingBlockKeyMagistrateInstance = new FunctionBuildingBlockKeyMagistrate();
export const getNewAccessKey = FunctionBuildingBlockKeyMagistrateInstance.getNewAccessKey();
