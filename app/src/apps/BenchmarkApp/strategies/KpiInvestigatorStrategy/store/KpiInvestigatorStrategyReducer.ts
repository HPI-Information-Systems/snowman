import { DiagramCoordinates } from 'api/models/DiagramCoordinates';
import { KPIDiagramConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SoftKPIDiagramConfigurator';
import { initialResourcesState } from 'apps/BenchmarkApp/store/BenchmarkAppReducer';
import {
  coordinatesMapKey,
  groundTruthKey,
} from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/store/KpiInvestigatorStrategyActions';
import { KpiInvestigatorStrategyActionTypes } from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyActionTypes';
import {
  DiagramTrack,
  KpiInvestigatorColorMode,
  KpiInvestigatorStrategyModel,
} from 'apps/BenchmarkApp/strategies/KpiInvestigatorStrategy/types/KpiInvestigatorStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  resolveExperimentEntity,
  uniqueExperimentEntityKey,
} from 'apps/BenchmarkApp/utils/experimentEntity';
import produce from 'immer';
import { groupBy } from 'lodash';
import { AllMetricsEnum, AllMetricsObject } from 'types/AllMetricsEnum';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { SnowmanAction } from 'types/SnowmanAction';

const initialState: KpiInvestigatorStrategyModel = {
  isValidConfig: false,
  diagramTracks: [],
  coordinates: {},
  valueRange: undefined,
  definitionRange: undefined,
  xAxis: AllMetricsObject.Accuracy,
  yAxis: AllMetricsObject.F1Score,
  colorMode: KpiInvestigatorColorMode.BY_MATCHING_SOLUTION,
  configuration: {
    diagramTracks: [],
  },
  resources: initialResourcesState,
};

const extractEntities = ({
  configuration,
  resources,
}: KpiInvestigatorStrategyModel): [goldKey: string, exp: ExperimentEntity][] =>
  configuration.diagramTracks.flatMap((aTrack) => {
    const goldEntity = resolveExperimentEntity(aTrack.groundTruth, resources);
    const goldKey = groundTruthKey(goldEntity);
    return aTrack.experiments
      .map((anExperiment) => resolveExperimentEntity(anExperiment, resources))
      .filter(
        (
          anEntity: ExperimentEntity | undefined
        ): anEntity is ExperimentEntity => anEntity !== undefined
      )
      .map((anEntity) => [goldKey, anEntity] as [string, ExperimentEntity]);
  });

const getDiagramTracks = (
  state: KpiInvestigatorStrategyModel
): {
  diagramTracks: DiagramTrack[];
  isValidConfig: boolean;
} => {
  let groupEntitiesBy: (
    props: [goldKey: string, exp: ExperimentEntity]
  ) => string;
  let trackName: (entities: ExperimentEntity[]) => string | undefined;
  switch (state.colorMode) {
    case KpiInvestigatorColorMode.BY_DATASET:
      groupEntitiesBy = ([gold]) => gold;
      trackName = (entities) =>
        state.resources.datasets.find(
          ({ id }) => id === entities[0].experiment.datasetId
        )?.name;
      break;
    case KpiInvestigatorColorMode.BY_MATCHING_SOLUTION:
      groupEntitiesBy = ([, entity]) => `${entity.experiment.algorithmId}`;
      trackName = (entities) =>
        state.resources.algorithms.find(
          ({ id }) => id === entities[0].experiment.algorithmId
        )?.name;
      break;
  }
  const entities = extractEntities(state);
  return {
    diagramTracks: (Object.values(groupBy(entities, groupEntitiesBy)) as [
      goldKey: string,
      exp: ExperimentEntity
    ][][])
      .map((entities, index) => ({
        name:
          trackName(entities.map(([, anEntity]) => anEntity)) ??
          `Track ${index + 1}`,
        coordinates: entities
          .map(
            ([goldKey, anEntity]) =>
              state.coordinates[
                coordinatesMapKey(goldKey, uniqueExperimentEntityKey(anEntity))
              ]
          )
          .filter(
            (
              coordinates: DiagramCoordinates | undefined
            ): coordinates is DiagramCoordinates => coordinates !== undefined
          ),
      }))
      .filter((track) => track.coordinates.length > 0),
    isValidConfig: entities.length > 0,
  };
};

const KpiInvestigatorStrategyReducer = (
  state: KpiInvestigatorStrategyModel = initialState,
  action: SnowmanAction
): KpiInvestigatorStrategyModel => {
  return produce(state, (state) => {
    switch (action.type) {
      case KpiInvestigatorStrategyActionTypes.UPDATE_CONFIG: {
        const appState = action.payload as BenchmarkAppModel;
        const configuration = KPIDiagramConfiguration.getValue(appState);
        state.configuration = configuration;
        state.resources = appState.resources;
        break;
      }
      case KpiInvestigatorStrategyActionTypes.SET_COORDINATES:
        state.coordinates = action.payload as Record<
          string,
          DiagramCoordinates
        >;
        state.definitionRange = action.optionalPayload as
          | [number, number]
          | undefined;
        state.valueRange = action.optionalPayload2 as
          | [number, number]
          | undefined;
        break;
      case KpiInvestigatorStrategyActionTypes.SET_X_AXIS:
        state.xAxis = action.payload as AllMetricsEnum;
        break;
      case KpiInvestigatorStrategyActionTypes.SET_Y_AXIS:
        state.yAxis = action.payload as AllMetricsEnum;
        break;
      case KpiInvestigatorStrategyActionTypes.SET_COLOR_MODE:
        state.colorMode = action.payload as KpiInvestigatorColorMode;
        break;
    }
    const { isValidConfig, diagramTracks } = getDiagramTracks(state);
    state.isValidConfig = isValidConfig;
    state.diagramTracks = diagramTracks;
    return state;
  });
};

export default KpiInvestigatorStrategyReducer;
