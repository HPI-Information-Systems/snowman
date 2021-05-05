import { Algorithm, Dataset, Experiment } from 'api';
import ConfigurationStoreReducer from 'apps/BenchmarkApp/store/ConfigurationStoreReducer';
import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import {
  BenchmarkAppModel,
  BenchmarkAppResourcesStore,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ExpandedEntity } from 'apps/BenchmarkApp/types/ExpandedEntity';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { union } from 'lodash';
import { SnowmanAction } from 'types/SnowmanAction';

const initialConfigState: BenchmarkAppResourcesStore = {
  algorithms: [],
  datasets: [],
  experiments: [],
  selectedExperimentIds: [],
};

const initialState: BenchmarkAppModel = {
  resources: initialConfigState,
  expandedAlgorithmsInDatasets: [],
  searchString: '',
  activeStrategy: StrategyIDs.Dashboard,
  config: {
    datasets: {},
    algorithms: {},
    experiments: {},
    simFunctions: {},
    simThresholds: {},
  },
};

const removeExpandedEntity = (entities: ExpandedEntity[], id: number) =>
  entities.filter((value: ExpandedEntity): boolean => value.id !== id);
const removeExpandedSubEntity = (
  entities: ExpandedEntity[],
  idOuter: number,
  idInner: number
) =>
  entities
    .find((value: ExpandedEntity): boolean => value.id === idOuter)
    ?.children.filter(
      (value: ExpandedEntity): boolean => value.id !== idInner
    ) ?? [];

const BenchmarkAppReducer = (
  state: BenchmarkAppModel = initialState,
  action: SnowmanAction
): BenchmarkAppModel => {
  return ConfigurationStoreReducer(
    InternalBenchmarkAppReducer(state, action),
    action
  );
};

const InternalBenchmarkAppReducer = (
  state: BenchmarkAppModel,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    case BenchmarkAppActionsTypes.SET_ALGORITHMS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        resources: {
          ...state.resources,
          selectedExperimentIds: [],
          algorithms: action.payload as Algorithm[],
        },
      };
    case BenchmarkAppActionsTypes.SET_DATASETS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        resources: {
          ...state.resources,
          selectedExperimentIds: [],
          datasets: action.payload as Dataset[],
        },
      };
    case BenchmarkAppActionsTypes.SET_EXPERIMENTS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        resources: {
          ...state.resources,
          selectedExperimentIds: [],
          experiments: action.payload as Experiment[],
        },
      };
    case BenchmarkAppActionsTypes.SELECT_DATASET_CHILDREN:
      return {
        ...state,
        resources: {
          ...state.resources,
          selectedExperimentIds: union(
            state.resources.selectedExperimentIds,
            state.resources.experiments
              .filter(
                (anExperiment: Experiment): boolean =>
                  anExperiment.datasetId === (action.payload as number)
              )
              .map((anExperiment: Experiment): number => anExperiment.id)
          ),
        },
      };
    case BenchmarkAppActionsTypes.SELECT_ALGORITHM_CHILDREN:
      return {
        ...state,
        resources: {
          ...state.resources,
          selectedExperimentIds: union(
            state.resources.selectedExperimentIds,
            state.resources.experiments
              .filter(
                (anExperiment: Experiment): boolean =>
                  anExperiment.datasetId === (action.payload as number) &&
                  anExperiment.algorithmId ===
                    (action.optionalPayload as number)
              )
              .map((anExperiment: Experiment): number => anExperiment.id)
          ),
        },
      };
    case BenchmarkAppActionsTypes.TOGGLE_EXPERIMENT:
      return {
        ...state,
        resources: {
          ...state.resources,
          selectedExperimentIds: state.resources.selectedExperimentIds.includes(
            action.payload as number
          )
            ? state.resources.selectedExperimentIds.filter(
                (value: number): boolean => value !== (action.payload as number)
              )
            : union(state.resources.selectedExperimentIds, [
                action.payload as number,
              ]),
        },
      };
    case BenchmarkAppActionsTypes.EXPAND_DATASET_FULL:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [
          ...removeExpandedEntity(
            state.expandedAlgorithmsInDatasets,
            action.payload as number
          ),
          {
            id: action.payload as number,
            children: state.resources.algorithms
              .filter(
                (anAlgorithm: Algorithm): boolean =>
                  state.resources.experiments.findIndex(
                    (anExperiment: Experiment): boolean =>
                      anExperiment.datasetId === (action.payload as number) &&
                      anExperiment.algorithmId === anAlgorithm.id
                  ) > -1
              )
              .map(
                (anAlgorithm: Algorithm): ExpandedEntity => ({
                  id: anAlgorithm.id,
                  children: [],
                })
              ),
          },
        ],
      };
    case BenchmarkAppActionsTypes.EXPAND_DATASET:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [
          ...removeExpandedEntity(
            state.expandedAlgorithmsInDatasets,
            action.payload as number
          ),
          { id: action.payload as number, children: [] },
        ],
      };
    case BenchmarkAppActionsTypes.SHRINK_DATASET:
      return {
        ...state,
        expandedAlgorithmsInDatasets: removeExpandedEntity(
          state.expandedAlgorithmsInDatasets,
          action.payload as number
        ),
      };
    case BenchmarkAppActionsTypes.EXPAND_ALGORITHM:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [
          ...removeExpandedEntity(
            state.expandedAlgorithmsInDatasets,
            action.payload as number
          ),
          {
            id: action.payload as number,
            children: [
              ...removeExpandedSubEntity(
                state.expandedAlgorithmsInDatasets,
                action.payload as number,
                action.optionalPayload as number
              ),
              { id: action.optionalPayload as number, children: [] },
            ],
          },
        ],
      };
    case BenchmarkAppActionsTypes.SHRINK_ALGORITHM:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [
          ...removeExpandedEntity(
            state.expandedAlgorithmsInDatasets,
            action.payload as number
          ),
          {
            id: action.payload as number,
            children: [
              ...removeExpandedSubEntity(
                state.expandedAlgorithmsInDatasets,
                action.payload as number,
                action.optionalPayload as number
              ),
            ],
          },
        ],
      };
    case BenchmarkAppActionsTypes.SET_SEARCH_STRING: {
      if ((action.payload as string) !== '') {
        const selectedExperiments = state.resources.experiments.filter(
          (anExperiment: Experiment): boolean =>
            anExperiment.name.includes(action.payload as string)
        );
        const relevantDatasets = state.resources.datasets.filter(
          (aDataset: Dataset): boolean =>
            selectedExperiments.findIndex(
              (anExperiment: Experiment): boolean =>
                aDataset.id === anExperiment.datasetId
            ) > -1
        );
        return {
          ...state,
          searchString: action.payload as string,
          expandedAlgorithmsInDatasets: relevantDatasets.map(
            (aDataset: Dataset): ExpandedEntity => ({
              id: aDataset.id,
              children: state.resources.algorithms
                .filter(
                  (anAlgorithm: Algorithm): boolean =>
                    selectedExperiments.findIndex(
                      (anExperiment: Experiment): boolean =>
                        aDataset.id === anExperiment.datasetId &&
                        anAlgorithm.id === anExperiment.algorithmId
                    ) > -1
                )
                .map(
                  (anAlgorithm: Algorithm): ExpandedEntity => ({
                    id: anAlgorithm.id,
                    children: [],
                  })
                ),
            })
          ),
        };
      } else {
        return {
          ...state,
          searchString: '',
        };
      }
    }
    case BenchmarkAppActionsTypes.OPEN_STRATEGY:
      return {
        ...state,
        activeStrategy: action.payload as StrategyIDs,
      };
    case BenchmarkAppActionsTypes.SELECT_NONE:
      return {
        ...state,
        resources: {
          ...state.resources,
          selectedExperimentIds: [],
        },
      };
    default:
      return state;
  }
};

export default BenchmarkAppReducer;
