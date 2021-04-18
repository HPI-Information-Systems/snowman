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
  expanded: [],
  selectedExperiments: [],
};

const BenchmarkAppReducer = (
  state: BenchmarkAppModel = initialState,
  action: SnowmanAction
): BenchmarkAppModel => {
  switch (action.type) {
    case BenchmarkAppActionsTypes.SET_ALGORITHMS:
      return {
        ...state,
        algorithms: action.payload as Algorithm[],
      };
    case BenchmarkAppActionsTypes.SET_DATASETS:
      return {
        ...state,
        datasets: action.payload as Dataset[],
      };
    case BenchmarkAppActionsTypes.SET_EXPERIMENTS:
      return {
        ...state,
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
    case BenchmarkAppActionsTypes.SELECT_EXPERIMENT:
      return {
        ...state,
        selectedExperiments: state.selectedExperiments.includes(
          action.payload as number
        )
          ? state.selectedExperiments.filter(
              (value: number): boolean => value !== (action.payload as number)
            )
          : [...state.selectedExperiments, action.payload as number],
      };
    case BenchmarkAppActionsTypes.EXPAND_DATASET:
      return {
        ...state,
        expanded: [
          ...state.expanded,
          { id: action.payload as number, children: [] },
        ],
      };
    case BenchmarkAppActionsTypes.SHRINK_DATASET:
      return {
        ...state,
        expanded: state.expanded.filter(
          (value: ExpandedEntity): boolean =>
            value.id !== (action.payload as number)
        ),
      };
    case BenchmarkAppActionsTypes.EXPAND_ALGORITHM:
      return {
        ...state,
        expanded: [
          ...state.expanded.filter(
            (value: ExpandedEntity): boolean =>
              value.id !== (action.payload as number)
          ),
          {
            id: action.payload as number,
            children: [
              ...(state.expanded
                .find(
                  (value: ExpandedEntity): boolean =>
                    value.id === (action.payload as number)
                )
                ?.children.filter(
                  (value: ExpandedEntity): boolean =>
                    value.id !== (action.optionalPayload as number)
                ) ?? []),
              { id: action.optionalPayload as number, children: [] },
            ],
          },
        ],
      };
    case BenchmarkAppActionsTypes.SHRINK_ALGORITHM:
      return {
        ...state,
        expanded: [
          ...state.expanded.filter(
            (value: ExpandedEntity): boolean =>
              value.id !== (action.payload as number)
          ),
          {
            id: action.payload as number,
            children: [
              ...(state.expanded
                .find(
                  (value: ExpandedEntity): boolean =>
                    value.id === (action.payload as number)
                )
                ?.children.filter(
                  (value: ExpandedEntity): boolean =>
                    value.id !== (action.optionalPayload as number)
                ) ?? []),
            ],
          },
        ],
      };
    default:
      return state;
  }
};

export default BenchmarkAppReducer;
