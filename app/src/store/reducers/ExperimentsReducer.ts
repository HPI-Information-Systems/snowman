import { Experiment } from 'api';
import { difference } from 'lodash';
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
      const eventDescriptor: DragNDropDescriptor = action.payload as DragNDropDescriptor;
      const [draggedExperiment]: Experiment[] = getBucketFromId(
        state,
        eventDescriptor.sourceBucket
      ).splice(eventDescriptor.sourceIndex, 1);
      return state;
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
