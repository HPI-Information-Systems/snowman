import { Algorithm, Dataset, Experiment } from 'api';
import { BenchmarkAppActionsTypes } from 'apps/BenchmarkApp/types/BenchmarkAppActionsTypes';
import {
  BenchmarkAppConfigStore,
  BenchmarkAppModel,
} from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ExpandedEntity } from 'apps/BenchmarkApp/types/ExpandedEntity';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { union } from 'lodash';
import { SnowmanAction } from 'types/SnowmanAction';

const initialConfigState: BenchmarkAppConfigStore = {
  algorithms: [],
  datasets: [],
  experiments: [],
  selectedExperimentIds: [],
};

const initialState: BenchmarkAppModel = {
  config: initialConfigState,
  expandedAlgorithmsInDatasets: [],
  searchString: '',
  activeStrategy: StrategyIDs.Dashboard,
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
  switch (action.type) {
    case BenchmarkAppActionsTypes.SET_ALGORITHMS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        config: {
          ...state.config,
          selectedExperimentIds: [],
          algorithms: action.payload as Algorithm[],
        },
      };
    case BenchmarkAppActionsTypes.SET_DATASETS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        config: {
          ...state.config,
          selectedExperimentIds: [],
          datasets: action.payload as Dataset[],
        },
      };
    case BenchmarkAppActionsTypes.SET_EXPERIMENTS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        config: {
          ...state.config,
          selectedExperimentIds: [],
          experiments: action.payload as Experiment[],
        },
      };
    case BenchmarkAppActionsTypes.SELECT_DATASET_CHILDREN:
      return {
        ...state,
        config: {
          ...state.config,
          selectedExperimentIds: union(
            state.config.selectedExperimentIds,
            state.config.experiments
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
        config: {
          ...state.config,
          selectedExperimentIds: union(
            state.config.selectedExperimentIds,
            state.config.experiments
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
        config: {
          ...state.config,
          selectedExperimentIds: state.config.selectedExperimentIds.includes(
            action.payload as number
          )
            ? state.config.selectedExperimentIds.filter(
                (value: number): boolean => value !== (action.payload as number)
              )
            : union(state.config.selectedExperimentIds, [
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
            children: state.config.algorithms
              .filter(
                (anAlgorithm: Algorithm): boolean =>
                  state.config.experiments.findIndex(
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
        const selectedExperiments = state.config.experiments.filter(
          (anExperiment: Experiment): boolean =>
            anExperiment.name.includes(action.payload as string)
        );
        const relevantDatasets = state.config.datasets.filter(
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
              children: state.config.algorithms
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
        config: {
          ...state.config,
          selectedExperimentIds: [],
        },
      };
    default:
      return state;
  }
};

export default BenchmarkAppReducer;
