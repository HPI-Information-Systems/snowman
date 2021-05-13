import { ExperimentIntersectionCount } from 'api';
import { IntersectionConfiguration } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/IntersectionConfigurator';
import { IntersectionStrategyActionTypes } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyActionTypes';
import { IntersectionStrategyModel } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyModel';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  experimentEntitiesEqual,
  resolveExperimentEntity,
  uniqueExperimentEntityKey,
} from 'apps/BenchmarkApp/utils/experimentEntity';
import { difference, nth, uniqBy } from 'lodash';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';
import { ExperimentEntity } from 'types/ExperimentEntity';
import { IntersectionBuckets } from 'types/IntersectionBuckets';
import { SnowmanAction } from 'types/SnowmanAction';
import { insertElementAt } from 'utils/dragNDropHelpers';

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
): ExperimentEntity[] => {
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
      const appStore = action.payload as BenchmarkAppModel;
      const configuration = IntersectionConfiguration.getValue(appStore);
      const experimentConfigs = uniqBy(
        [...configuration.experiments.flat(), configuration.groundTruth]
          .map((config) => resolveExperimentEntity(config, appStore))
          .filter(
            (
              entity: ExperimentEntity | undefined
            ): entity is ExperimentEntity => entity !== undefined
          ),
        uniqueExperimentEntityKey
      );
      if (experimentConfigs.length === 0) {
        return initialState;
      }

      const resultState = {
        ...state,
        available: experimentConfigs,
        ignored: experimentConfigs.filter(
          (entity1) =>
            state.included.find((entity2) =>
              experimentEntitiesEqual(entity1, entity2)
            ) === undefined &&
            state.excluded.find((entity2) =>
              experimentEntitiesEqual(entity1, entity2)
            ) === undefined
        ),
        excluded: experimentConfigs.filter(
          (entity1) =>
            state.excluded.find((entity2) =>
              experimentEntitiesEqual(entity1, entity2)
            ) !== undefined
        ),
        included: experimentConfigs.filter(
          (entity1) =>
            state.included.find((entity2) =>
              experimentEntitiesEqual(entity1, entity2)
            ) !== undefined
        ),
        counts: [],
        isValidConfig: true,
      };
      return resultState;
    }
    case IntersectionStrategyActionTypes.SET_COUNTS:
      return {
        ...state,
        counts: action.payload as ExperimentIntersectionCount[],
      };
    case IntersectionStrategyActionTypes.DRAG_N_DROP_EXPERIMENT: {
      let newIgnored: ExperimentEntity[];
      let newIncluded: ExperimentEntity[];
      let newExcluded: ExperimentEntity[];
      const eventDescriptor: DragNDropDescriptor<IntersectionBuckets> = action.payload as DragNDropDescriptor<IntersectionBuckets>;
      const draggedExperimentEntity: ExperimentEntity | undefined = nth(
        getIntersectionBucketFromId(state, eventDescriptor.sourceBucket),
        eventDescriptor.sourceIndex
      );
      if (draggedExperimentEntity === undefined) return state;

      newIgnored = state.ignored.filter(
        (entity) => !experimentEntitiesEqual(entity, draggedExperimentEntity)
      );
      newIncluded = state.included.filter(
        (entity) => !experimentEntitiesEqual(entity, draggedExperimentEntity)
      );
      newExcluded = state.excluded.filter(
        (entity) => !experimentEntitiesEqual(entity, draggedExperimentEntity)
      );

      switch (eventDescriptor.targetBucket) {
        case IntersectionBuckets.IGNORED:
          newIgnored = insertElementAt<ExperimentEntity>(
            newIgnored,
            draggedExperimentEntity,
            eventDescriptor.targetIndex
          );
          break;
        case IntersectionBuckets.INCLUDED:
          newIncluded = insertElementAt<ExperimentEntity>(
            newIncluded,
            draggedExperimentEntity,
            eventDescriptor.targetIndex
          );
          break;
        case IntersectionBuckets.EXCLUDED:
          newExcluded = insertElementAt<ExperimentEntity>(
            newExcluded,
            draggedExperimentEntity,
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
          action.payload as ExperimentEntity[]
        ),
        included: action.payload as ExperimentEntity[],
        excluded: [],
      };
    default:
      return state;
  }
};

export default IntersectionStrategyReducer;
