import {
  BenchmarkApi,
  DiagramCoordinates as RawDiagramCoordinates,
  DiagramExperimentItem,
  DiagramResponse,
} from 'api';
import { KpiInvestigatorStrategyActionTypes } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyActionTypes';
import {
  KpiInvestigatorColorMode,
  KpiInvestigatorStrategyModel,
} from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import {
  BenchmarkAppModel,
  BenchmarkAppResourcesModel,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { DiagramCoordinates } from 'apps/BenchmarkApp/types/DiagramCoordinates';
import {
  experimentEntityFromConfig,
  experimentEntityToExperimentConfigItem,
  resolveExperimentEntity,
  stringifyExperimentEntity,
  uniqueExperimentConfigKey,
  uniqueExperimentEntityKey,
} from 'apps/BenchmarkApp/utils/experimentEntity';
import { MagicNotPossibleId } from 'structs/constants';
import { AllMetricsEnum } from 'types/AllMetricsEnum';
import { ExperimentEntity } from 'types/ExperimentEntity';
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

export const groundTruthKey = (
  groundTruth: ExperimentEntity | undefined
): string =>
  groundTruth !== undefined ? uniqueExperimentEntityKey(groundTruth) : '';

export const coordinatesMapKey = (goldKey: string, expKey: string): string =>
  `${goldKey}#${expKey}`;

const tooltipForRawCoordinates = (
  coordinates: RawDiagramCoordinates,
  resources: BenchmarkAppResourcesModel
): string =>
  stringifyExperimentEntity(resolveExperimentEntity(coordinates, resources));

const buildCoordinatesMap = (
  coordinates: [goldStandardKey: string, coordinates: DiagramResponse][],
  resources: BenchmarkAppResourcesModel
): Record<string, DiagramCoordinates> =>
  Object.fromEntries(
    coordinates.flatMap(([goldStandardKey, coordinates]) =>
      coordinates.coordinates.map((coordinates) => [
        coordinatesMapKey(
          goldStandardKey,
          uniqueExperimentConfigKey({
            experimentId: coordinates.experimentId ?? MagicNotPossibleId,
            similarity:
              coordinates.funcId !== undefined
                ? {
                    func: coordinates.funcId,
                    threshold: coordinates.threshold ?? 0,
                  }
                : undefined,
          })
        ),
        {
          ...coordinates,
          tooltip: tooltipForRawCoordinates(coordinates, resources),
        } as DiagramCoordinates,
      ])
    )
  );

const setCoordinates = (
  allCoordinates: [goldStandardKey: string, coordinates: DiagramResponse][],
  resources: BenchmarkAppResourcesModel
): easyPrimitiveActionReturn<KpiInvestigatorStrategyModel> =>
  easyPrimitiveAction<KpiInvestigatorStrategyModel>({
    type: KpiInvestigatorStrategyActionTypes.SET_COORDINATES,
    payload: buildCoordinatesMap(allCoordinates, resources),
    optionalPayload: allCoordinates[0][1].definitionRange,
    optionalPayload2: allCoordinates[0][1].valueRange,
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
  const state = getState();
  if (!state.isValidConfig) {
    return Promise.resolve();
  }
  return Promise.all(
    state.configuration.diagramTracks
      .map((aTrack): [
        groundTruthKey: string,
        items: DiagramExperimentItem[]
      ] => {
        const groundTruthEntity = experimentEntityFromConfig(
          aTrack.groundTruth,
          state.resources
        );
        const groundTruth =
          groundTruthEntity !== undefined
            ? experimentEntityToExperimentConfigItem(groundTruthEntity)
            : undefined;
        return [
          groundTruthKey(groundTruthEntity),
          aTrack.experiments
            .map((entity) =>
              experimentEntityFromConfig(entity, state.resources)
            )
            .filter(
              (
                anEntity: ExperimentEntity | undefined
              ): anEntity is ExperimentEntity => anEntity !== undefined
            )
            .map(
              (anEntity): DiagramExperimentItem => ({
                groundTruth,
                experiment: experimentEntityToExperimentConfigItem(anEntity),
              })
            ),
        ];
      })
      .filter(([, items]) => items.length > 0)
      .map(([groundTruthKey, items]) =>
        RequestHandler(() =>
          new BenchmarkApi().calculateDiagramData({
            xAxis: state.xAxis,
            yAxis: state.yAxis,
            diagram: {
              multipleExperiments: items,
            },
          })
        ).then((points): [string, DiagramResponse] => [groundTruthKey, points])
      )
  ).then((coordinates) =>
    dispatch(setCoordinates(coordinates, state.resources))
  );
};

export const loadStrategyData = (
  dispatch: SnowmanDispatch<KpiInvestigatorStrategyModel>,
  appStore: BenchmarkAppModel
): void => {
  dispatch(updateConfig(appStore));
  dispatch(loadCoordinates()).then();
};

export const setColorMode = (
  mode: KpiInvestigatorColorMode
): easyPrimitiveActionReturn<KpiInvestigatorStrategyModel> =>
  easyPrimitiveAction<KpiInvestigatorStrategyModel>({
    type: KpiInvestigatorStrategyActionTypes.SET_COLOR_MODE,
    payload: mode,
  });
