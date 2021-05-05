import { Experiment, ExperimentIntersectionCount } from 'api';
import { IntersectionStrategyActionTypes } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyActionTypes';
import { IntersectionStrategyModel } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyModel';
import { BenchmarkAppResourcesStore } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { difference, nth } from 'lodash';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';
import { IntersectionBuckets } from 'types/IntersectionBuckets';
import { SnowmanAction } from 'types/SnowmanAction';
import { filterOutAnElement, insertElementAt } from 'utils/dragNDropHelpers';

const initialState: IntersectionStrategyModel = {
  isValidConfig: false,
  available: [],
  excluded: [],
  included: [],
  ignored: [],
  counts: [],
};

export const getIntersectionBucketFromId = (
  state: IntersectionStrategyModel,
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

const IntersectionStrategyReducer = (
  state: IntersectionStrategyModel = initialState,
  action: SnowmanAction
): IntersectionStrategyModel => {
  switch (action.type) {
    case IntersectionStrategyActionTypes.UPDATE_CONFIG: {
      const config = action.payload as BenchmarkAppResourcesStore;

      if (config.selectedExperimentIds.length < 1) {
        return {
          ...state,
          isValidConfig: false,
        };
      }

      const selectedExperiments = config.experiments.filter(
        (anExperiment: Experiment): boolean =>
          config.selectedExperimentIds.includes(anExperiment.id)
      );

      if (
        selectedExperiments.length !==
        selectedExperiments.filter(
          (anExperiment: Experiment): boolean =>
            anExperiment.datasetId === selectedExperiments[0].datasetId
        ).length
      ) {
        return {
          ...state,
          isValidConfig: false,
        };
      }

      return {
        ...state,
        available: selectedExperiments,
        ignored: [...selectedExperiments],
        excluded: [],
        included: [],
        counts: [],
        isValidConfig: true,
      };
    }
    case IntersectionStrategyActionTypes.SET_COUNTS:
      return {
        ...state,
        counts: action.payload as ExperimentIntersectionCount[],
      };
    case IntersectionStrategyActionTypes.DRAG_N_DROP_EXPERIMENT: {
      let newIgnored, newIncluded, newExcluded: Experiment[];
      const eventDescriptor: DragNDropDescriptor<IntersectionBuckets> = action.payload as DragNDropDescriptor<IntersectionBuckets>;
      const draggedExperiment: Experiment | undefined = nth(
        getIntersectionBucketFromId(state, eventDescriptor.sourceBucket),
        eventDescriptor.sourceIndex
      );
      if (draggedExperiment === undefined) return state;

      newIgnored = filterOutAnElement<Experiment>(
        state.ignored,
        draggedExperiment
      );
      newIncluded = filterOutAnElement<Experiment>(
        state.included,
        draggedExperiment
      );
      newExcluded = filterOutAnElement<Experiment>(
        state.excluded,
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
        ...state,
        ignored: newIgnored,
        included: newIncluded,
        excluded: newExcluded,
      };
    }
    case IntersectionStrategyActionTypes.RESET_INCLUDED_EXPERIMENTS:
      return {
        ...state,
        ignored: difference(
          [...state.available],
          action.payload as Experiment[]
        ),
        included: action.payload as Experiment[],
        excluded: [],
      };
    default:
      return state;
  }
};

export default IntersectionStrategyReducer;
