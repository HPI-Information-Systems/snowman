import { BenchmarkApi, DiagramResponse } from 'api';
import { SimilarityDiagramStrategyActionTypes } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyActionTypes';
import { SimilarityDiagramStrategyModel } from 'apps/BenchmarkApp/strategies/SimilarityDiagramStrategy/types/SimilarityDiagramStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { MagicNotPossibleId } from 'structs/constants';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { SnowmanThunkAction } from 'types/SnowmanThunkAction';
import {
  easyPrimitiveAction,
  easyPrimitiveActionReturn,
} from 'utils/easyActionsFactory';
import RequestHandler from 'utils/requestHandler';

export const updateConfig = (
  benchmarkConfig: BenchmarkAppModel
): easyPrimitiveActionReturn<SimilarityDiagramStrategyModel> =>
  easyPrimitiveAction<SimilarityDiagramStrategyModel>({
    type: SimilarityDiagramStrategyActionTypes.UPDATE_CONFIG,
    payload: benchmarkConfig,
  });

export const setCoordinates = (
  allCoordinates: DiagramResponse[]
): easyPrimitiveActionReturn<SimilarityDiagramStrategyModel> =>
  easyPrimitiveAction<SimilarityDiagramStrategyModel>({
    type: SimilarityDiagramStrategyActionTypes.SET_COORDINATES,
    payload: allCoordinates.map(({ coordinates }) => coordinates),
    optionalPayload: allCoordinates[0].definitionRange,
    optionalPayload2: allCoordinates[0].valueRange,
  });

export const setYAxis = (
  aMetric: AllMetricsEnum
): easyPrimitiveActionReturn<SimilarityDiagramStrategyModel> =>
  easyPrimitiveAction<SimilarityDiagramStrategyModel>({
    type: SimilarityDiagramStrategyActionTypes.SET_Y_AXIS,
    payload: aMetric,
  });

export const setXAxis = (
  aMetric: AllMetricsEnum
): easyPrimitiveActionReturn<SimilarityDiagramStrategyModel> =>
  easyPrimitiveAction<SimilarityDiagramStrategyModel>({
    type: SimilarityDiagramStrategyActionTypes.SET_X_AXIS,
    payload: aMetric,
  });

export const loadCoordinates = (): SnowmanThunkAction<
  Promise<void>,
  SimilarityDiagramStrategyModel
> => async (
  dispatch: SnowmanDispatch<SimilarityDiagramStrategyModel>,
  getState: () => SimilarityDiagramStrategyModel
): Promise<void> => {
  if (!getState().isValidConfig) return Promise.resolve();
  return Promise.all(
    getState().diagramTracks.map(
      (anItem): Promise<DiagramResponse> =>
        RequestHandler(() =>
          new BenchmarkApi().calculateDiagramData({
            yAxis: getState().yAxis,
            xAxis: getState().xAxis,
            diagram: {
              similarityThresholds: {
                experimentId: anItem.items[0].experiment.experimentId,
                groundTruthId:
                  anItem.items[0].groundTruth?.experimentId ??
                  MagicNotPossibleId,
                steps: 100,
                func:
                  anItem.items[0].experiment.similarity?.func ??
                  MagicNotPossibleId,
              },
            },
          })
        )
    )
  ).then((allCoordinates) => dispatch(setCoordinates(allCoordinates)));
};

export const loadStrategyData = (
  dispatch: SnowmanDispatch<SimilarityDiagramStrategyModel>,
  appStore: BenchmarkAppModel
): void => {
  dispatch(updateConfig(appStore));
  dispatch(loadCoordinates()).then();
};
