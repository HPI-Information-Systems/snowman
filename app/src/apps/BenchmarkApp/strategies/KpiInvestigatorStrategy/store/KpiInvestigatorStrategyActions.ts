import { BenchmarkApi, MetricsEnum } from 'api';
import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { KpiInvestigatorStrategyActionTypes } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyActionTypes';
import { KpiInvestigatorStrategyModel } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
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
  coordinates: DiagramCoordinates[]
): easyPrimitiveActionReturn<KpiInvestigatorStrategyModel> =>
  easyPrimitiveAction<KpiInvestigatorStrategyModel>({
    type: KpiInvestigatorStrategyActionTypes.SET_COORDINATES,
    payload: coordinates,
  });

export const loadCoordinates = (): SnowmanThunkAction<
  Promise<void>,
  KpiInvestigatorStrategyModel
> => async (
  dispatch: SnowmanDispatch<KpiInvestigatorStrategyModel>,
  getState: () => KpiInvestigatorStrategyModel
): Promise<void> => {
  if (!getState().isValidConfig) return Promise.resolve();
  return RequestHandler(
    () =>
      new BenchmarkApi()
        .calculateDiagramData({
          xAxis: MetricsEnum.Accuracy,
          yAxis: MetricsEnum.Recall,
          diagram: { multipleExperiments: getState().experimentItems },
        })
        .then((coordinates) => dispatch(setCoordinates(coordinates))),
    'It worked!'
  );
};

export const loadStrategyData = (
  dispatch: SnowmanDispatch<KpiInvestigatorStrategyModel>,
  appStore: BenchmarkAppModel
): void => {
  dispatch(updateConfig(appStore));
  dispatch(loadCoordinates()).then();
  // Todo: Load smth
};
