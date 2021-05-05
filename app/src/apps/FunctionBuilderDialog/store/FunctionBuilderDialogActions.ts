import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionValuesTypeEnum,
  SimilarityThresholdsApi,
} from 'api';
import { FunctionBuilderDialogActionTypes } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogActionTypes';
import { FunctionBuilderDialogModel } from 'apps/FunctionBuilderDialog/types/FunctionBuilderDialogModel';
import { doCloseDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { nth } from 'lodash';
import { MagicNotPossibleId } from 'structs/constants';
import { SUCCESS_TO_CREATE_NEW_SIMILARITY_THRESHOLD_FUNCTION } from 'structs/statusMessages';
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
