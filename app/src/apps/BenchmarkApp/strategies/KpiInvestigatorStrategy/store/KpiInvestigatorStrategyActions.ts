import { BenchmarkApi } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { KpiInvestigatorStrategyActionTypes } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyActionTypes';
import { KpiInvestigatorStrategyModel } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
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
): easyPrimitiveActionReturn<KpiInvestigatorStrategyModel> =>
  easyPrimitiveAction<KpiInvestigatorStrategyModel>({
    type: KpiInvestigatorStrategyActionTypes.UPDATE_CONFIG,
    payload: benchmarkConfig,
  });

export const setCoordinates = (
  allCoordinates: DiagramCoordinates[][]
): easyPrimitiveActionReturn<KpiInvestigatorStrategyModel> =>
  easyPrimitiveAction<KpiInvestigatorStrategyModel>({
    type: KpiInvestigatorStrategyActionTypes.SET_COORDINATES,
    payload: allCoordinates,
  });

export const setXAxis = (
  aMetric: AllMetricsEnum
): easyPrimitiveActionReturn<KpiInvestigatorStrategyModel> =>
  easyPrimitiveAction<KpiInvestigatorStrategyModel>({
    type: KpiInvestigatorStrategyActionTypes.SET_X_AXIS,
    payload: aMetric,
  });

export const setYAxis = (
  aMetric: AllMetricsEnum
): easyPrimitiveActionReturn<KpiInvestigatorStrategyModel> =>
  easyPrimitiveAction<KpiInvestigatorStrategyModel>({
    type: KpiInvestigatorStrategyActionTypes.SET_Y_AXIS,
    payload: aMetric,
  });

export const loadCoordinates = (): SnowmanThunkAction<
  Promise<void>,
  KpiInvestigatorStrategyModel
> => async (
  dispatch: SnowmanDispatch<KpiInvestigatorStrategyModel>,
  getState: () => KpiInvestigatorStrategyModel
): Promise<void> => {
  if (!getState().isValidConfig) return Promise.resolve();
  return Promise.all(
    getState().diagramTracks.map(
      (anItem): Promise<DiagramCoordinates[]> =>
        RequestHandler(() =>
          new BenchmarkApi()
            .calculateDiagramData({
              xAxis: getState().xAxis,
              yAxis: getState().yAxis,
              diagram: { multipleExperiments: anItem.items },
            })
            .then((coordinates) => coordinates as DiagramCoordinates[])
        )
    )
  ).then((allCoordinates) => dispatch(setCoordinates(allCoordinates)));
};

export const loadStrategyData = (
  dispatch: SnowmanDispatch<KpiInvestigatorStrategyModel>,
  appStore: BenchmarkAppModel
): void => {
  dispatch(updateConfig(appStore));
  dispatch(loadCoordinates()).then();
  // Todo: Load smth
};
