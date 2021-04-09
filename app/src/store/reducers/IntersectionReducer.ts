import { Experiment, ExperimentIntersectionCount } from 'api';
import { difference, nth } from 'lodash';
import {
  CoreStoreActionTypes,
  DatasetsPageActionTypes,
  ExperimentsPageActionTypes,
  IntersectionStoreActionTypes as actionTypes,
} from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { BenchmarkConfigurationStore, IntersectionStore } from 'store/models';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';
import { IntersectionBuckets } from 'types/IntersectionBuckets';
import { filterOutAnElement, insertElementAt } from 'utils/dragNDropHelpers';

const initialState: IntersectionStore = {
  excluded: [],
  included: [],
  ignored: [],
  counts: [],
};

export const getIntersectionBucketFromId = (
  state: IntersectionStore,
  BucketId: IntersectionBuckets
): Experiment[] => {
  switch (BucketId) {
    case IntersectionBuckets.IGNORED:
      return state.ignored;
    case IntersectionBuckets.INCLUDED:
      return state.included;
    case IntersectionBuckets.EXCLUDED:
      return state.excluded;
  }
};

export const IntersectionReducer = (
  ownState: IntersectionStore = initialState,
  benchmarkState: BenchmarkConfigurationStore,
  action: SnowmanAction
): IntersectionStore => {
  switch (action.type) {
    case actionTypes.SET_COUNTS:
      return {
        ...ownState,
        counts: action.payload as ExperimentIntersectionCount[],
      };
    case actionTypes.DRAG_N_DROP_EXPERIMENT: {
      let newIgnored, newIncluded, newExcluded: Experiment[];
      const eventDescriptor: DragNDropDescriptor<IntersectionBuckets> = action.payload as DragNDropDescriptor<IntersectionBuckets>;
      const draggedExperiment: Experiment | undefined = nth(
        getIntersectionBucketFromId(ownState, eventDescriptor.sourceBucket),
        eventDescriptor.sourceIndex
      );
      if (draggedExperiment === undefined) return ownState;

      newIgnored = filterOutAnElement<Experiment>(
        ownState.ignored,
        draggedExperiment
      );
      newIncluded = filterOutAnElement<Experiment>(
        ownState.included,
        draggedExperiment
      );
      newExcluded = filterOutAnElement<Experiment>(
        ownState.excluded,
        draggedExperiment
      );

      switch (eventDescriptor.targetBucket) {
        case IntersectionBuckets.IGNORED:
          newIgnored = insertElementAt<Experiment>(
            newIgnored,
            draggedExperiment,
            eventDescriptor.targetIndex
          );
          break;
        case IntersectionBuckets.INCLUDED:
          newIncluded = insertElementAt<Experiment>(
            newIncluded,
            draggedExperiment,
            eventDescriptor.targetIndex
          );
          break;
        case IntersectionBuckets.EXCLUDED:
          newExcluded = insertElementAt<Experiment>(
            newExcluded,
            draggedExperiment,
            eventDescriptor.targetIndex
          );
          break;
      }
      return {
        ...ownState,
        ignored: newIgnored,
        included: newIncluded,
        excluded: newExcluded,
      };
    }
    case actionTypes.RESET_INCLUDED_EXPERIMENTS:
      return {
        ...ownState,
        ignored: difference(
          [
            ...benchmarkState.chosenGoldStandards,
            ...benchmarkState.chosenExperiments,
          ],
          action.payload as Experiment[]
        ),
        included: action.payload as Experiment[],
        excluded: [],
      };
    case CoreStoreActionTypes.SET_ALL_EXPERIMENTS:
    case ExperimentsPageActionTypes.DRAG_N_DROP_EXPERIMENT:
    case DatasetsPageActionTypes.CLICK_ON_DATASET:
    case actionTypes.RESET_INTERSECTION:
      return {
        ...initialState,
        ignored: [
          ...benchmarkState.chosenGoldStandards,
          ...benchmarkState.chosenExperiments,
        ],
      };
    default:
      return ownState;
  }
};
