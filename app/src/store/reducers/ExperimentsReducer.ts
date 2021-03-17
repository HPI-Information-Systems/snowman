import { Experiment } from 'api';
import { difference, nth } from 'lodash';
import { ExperimentsStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { ExperimentsStore } from 'store/models';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';
import { ExperimentBuckets } from 'types/ExperimentBuckets';
import { toggleSelectionArraySingleSelect } from 'utils/toggleSelectionArray';

const initialState: ExperimentsStore = {
  availableExperiments: [],
  chosenExperiments: [],
  chosenGoldStandards: [],
  selectedExperimentsTags: [],
};

const getBucketFromId = (
  state: ExperimentsStore,
  BucketId: ExperimentBuckets
): Experiment[] => {
  switch (BucketId) {
    case ExperimentBuckets.AVAILABLE_EXPERIMENTS:
      return state.availableExperiments;
    case ExperimentBuckets.CHOSEN_EXPERIMENTS:
      return state.chosenExperiments;
    case ExperimentBuckets.CHOSEN_GOLDSTANDARDS:
      return state.chosenGoldStandards;
  }
};

const insertExperimentAt = (
  sourceList: Experiment[],
  anExperiment: Experiment,
  targetIndex: number
): Experiment[] =>
  sourceList.length === 0
    ? [anExperiment]
    : [
        ...sourceList.splice(0, targetIndex),
        anExperiment,
        ...sourceList.slice(targetIndex),
      ];

export const ExperimentsReducer = (
  state: ExperimentsStore = initialState,
  action: SnowmanAction
): ExperimentsStore => {
  switch (action.type) {
    case actionTypes.SET_ALL_EXPERIMENTS: {
      const loadedExperiments: Experiment[] = action.payload as Experiment[];
      // TODO: refactor logic
      const loadedExperimentIds: number[] = loadedExperiments.map(
        (anExperiment: Experiment): number => anExperiment.id
      );
      const allowedGoldStandards: Experiment[] = state.chosenGoldStandards.filter(
        (anExperiment: Experiment): boolean =>
          loadedExperimentIds.includes(anExperiment.id)
      );
      const allowedSelectedExperiments: Experiment[] = state.chosenExperiments.filter(
        (anExperiment: Experiment): boolean =>
          loadedExperimentIds.includes(anExperiment.id)
      );
      return {
        ...state,
        chosenExperiments: allowedSelectedExperiments,
        chosenGoldStandards: allowedGoldStandards,
        availableExperiments: difference(
          difference(loadedExperiments, allowedGoldStandards),
          allowedSelectedExperiments
        ),
      };
    }
    case actionTypes.CLICK_ON_TAG:
      return {
        ...state,
        selectedExperimentsTags: toggleSelectionArraySingleSelect(
          state.selectedExperimentsTags,
          action.payload as string
        ),
      };
    case actionTypes.DRAG_N_DROP_EXPERIMENT: {
      let chosenExperiments,
        chosenGoldstandards,
        availableExperiments: Experiment[];
      const eventDescriptor: DragNDropDescriptor = action.payload as DragNDropDescriptor;
      const draggedExperiment: Experiment | undefined = nth(
        getBucketFromId(state, eventDescriptor.sourceBucket),
        eventDescriptor.sourceIndex
      );
      if (draggedExperiment === undefined) return state;
      chosenGoldstandards = state.chosenGoldStandards.filter(
        (anExperiment: Experiment): boolean =>
          anExperiment.id !== draggedExperiment.id
      );
      chosenExperiments = state.chosenExperiments.filter(
        (anExperiment: Experiment): boolean =>
          anExperiment.id !== draggedExperiment.id
      );
      availableExperiments = state.availableExperiments.filter(
        (anExperiment: Experiment): boolean =>
          anExperiment.id !== draggedExperiment.id
      );
      switch (eventDescriptor.targetBucket) {
        case ExperimentBuckets.CHOSEN_GOLDSTANDARDS:
          chosenGoldstandards = insertExperimentAt(
            chosenGoldstandards,
            draggedExperiment,
            eventDescriptor.targetIndex
          );
          break;
        case ExperimentBuckets.CHOSEN_EXPERIMENTS:
          chosenExperiments = insertExperimentAt(
            chosenExperiments,
            draggedExperiment,
            eventDescriptor.targetIndex
          );
          break;
        case ExperimentBuckets.AVAILABLE_EXPERIMENTS:
          availableExperiments = insertExperimentAt(
            availableExperiments,
            draggedExperiment,
            eventDescriptor.targetIndex
          );
          break;
      }
      return {
        ...state,
        chosenExperiments: chosenExperiments,
        chosenGoldStandards: chosenGoldstandards,
        availableExperiments: availableExperiments,
      };
    }
    case actionTypes.RESET_SELECTED_EXPERIMENTS:
      return {
        ...state,
        chosenExperiments: [],
      };
    default:
      return state;
  }
};
