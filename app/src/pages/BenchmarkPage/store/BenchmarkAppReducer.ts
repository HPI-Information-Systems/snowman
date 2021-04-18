import { Algorithm, Dataset, Experiment } from 'api';
import { union } from 'lodash';
import { BenchmarkAppActionsTypes } from 'pages/BenchmarkPage/store/BenchmarkAppActionsTypes';
import { BenchmarkAppModel } from 'pages/BenchmarkPage/store/BenchmarkAppModel';
import { ExpandedEntity } from 'pages/BenchmarkPage/types/ExpandedEntity';
import { SnowmanAction } from 'store/messages';

const initialState: BenchmarkAppModel = {
  algorithms: [],
  datasets: [],
  experiments: [],
  expandedAlgorithmsInDatasets: [],
  selectedExperiments: [],
  searchString: '',
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
        selectedExperiments: [],
        algorithms: action.payload as Algorithm[],
      };
    case BenchmarkAppActionsTypes.SET_DATASETS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        selectedExperiments: [],
        datasets: action.payload as Dataset[],
      };
    case BenchmarkAppActionsTypes.SET_EXPERIMENTS:
      return {
        ...state,
        expandedAlgorithmsInDatasets: [],
        selectedExperiments: [],
        experiments: action.payload as Experiment[],
      };
    case BenchmarkAppActionsTypes.SELECT_DATASET_CHILDREN:
      return {
        ...state,
        selectedExperiments: union(
          state.selectedExperiments,
          state.experiments
            .filter(
              (anExperiment: Experiment): boolean =>
                anExperiment.datasetId === (action.payload as number)
            )
            .map((anExperiment: Experiment): number => anExperiment.id)
        ),
      };
    case BenchmarkAppActionsTypes.SELECT_ALGORITHM_CHILDREN:
      return {
        ...state,
        selectedExperiments: union(
          state.selectedExperiments,
          state.experiments
            .filter(
              (anExperiment: Experiment): boolean =>
                anExperiment.datasetId === (action.payload as number) &&
                anExperiment.algorithmId === (action.optionalPayload as number)
            )
            .map((anExperiment: Experiment): number => anExperiment.id)
        ),
      };
    case BenchmarkAppActionsTypes.TOGGLE_EXPERIMENT:
      return {
        ...state,
        selectedExperiments: state.selectedExperiments.includes(
          action.payload as number
        )
          ? state.selectedExperiments.filter(
              (value: number): boolean => value !== (action.payload as number)
            )
          : union(state.selectedExperiments, [action.payload as number]),
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
        const selectedExperiments = state.experiments.filter(
          (anExperiment: Experiment): boolean =>
            anExperiment.name.includes(action.payload as string)
        );
        const relevantDatasets = state.datasets.filter(
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
              children: state.algorithms
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
    default:
      return state;
  }
};

export default BenchmarkAppReducer;
