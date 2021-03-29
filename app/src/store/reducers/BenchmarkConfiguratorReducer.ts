import { Algorithm, Dataset, Experiment } from 'api';
import { differenceBy, nth, unionBy } from 'lodash';
import {
  DatasetsPageActionTypes,
  ExperimentsPageActionTypes,
  NMetricsPageActionTypes,
} from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { BenchmarkConfigurationStore, CoreStore } from 'store/models';
import { MagicNotPossibleId } from 'structs/constants';
import { DragNDropDescriptor } from 'types/DragNDropDescriptor';
import { ExperimentBuckets } from 'types/ExperimentBuckets';
import { doesDatasetMatchTags } from 'utils/datasetHelper';
import { toggleSelectionArrayMultipleSelect } from 'utils/toggleSelectionArray';

const initialState: BenchmarkConfigurationStore = {
  selectedDatasetCategories: [],
  selectedDataset: null,
  selectedMatchingSolutions: [],
  availableExperiments: [],
  chosenGoldStandards: [],
  chosenExperiments: [],
  showExperimentFilters: false,
};

export const isExperimentBucketDisabledFromId = (
  state: BenchmarkConfigurationStore,
  BucketId: ExperimentBuckets
): boolean => {
  switch (BucketId) {
    case ExperimentBuckets.AVAILABLE_EXPERIMENTS:
      return false;
    case ExperimentBuckets.CHOSEN_EXPERIMENTS:
      return false;
    case ExperimentBuckets.CHOSEN_GOLDSTANDARDS:
      return state.chosenGoldStandards.length > 0;
  }
};

export const getExperimentBucketFromId = (
  state: BenchmarkConfigurationStore,
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

const BenchmarkConfiguratorImmediateReducer = (
  ownState: BenchmarkConfigurationStore,
  coreState: CoreStore,
  action: SnowmanAction
): BenchmarkConfigurationStore => {
  switch (action.type) {
    case DatasetsPageActionTypes.CLICK_ON_DATASET_CATEGORY: {
      const resultingCategories = toggleSelectionArrayMultipleSelect(
        ownState.selectedDatasetCategories,
        action.payload as string
      ) as string[];
      return {
        ...ownState,
        selectedDatasetCategories: resultingCategories,
        selectedDataset: doesDatasetMatchTags(
          ownState.selectedDataset,
          resultingCategories
        )
          ? ownState.selectedDataset
          : null,
      };
    }
    case DatasetsPageActionTypes.CLICK_ON_DATASET: {
      return (action.payload as Dataset).id !==
        (ownState.selectedDataset?.id ?? MagicNotPossibleId)
        ? {
            ...ownState,
            selectedDataset: action.payload as Dataset,
          }
        : { ...ownState, selectedDataset: null };
    }
    case ExperimentsPageActionTypes.CLICK_ON_EXPERIMENTS_FILTER_TOOL:
      return {
        ...ownState,
        showExperimentFilters: !ownState.showExperimentFilters,
      };
    case ExperimentsPageActionTypes.CLICK_ON_MATCHING_SOLUTION:
      return {
        ...ownState,
        selectedMatchingSolutions: toggleSelectionArrayMultipleSelect<Algorithm>(
          ownState.selectedMatchingSolutions,
          action.payload as Algorithm
        ),
      };
    case ExperimentsPageActionTypes.DRAG_N_DROP_EXPERIMENT: {
      let chosenExperiments,
        chosenGoldstandards,
        availableExperiments: Experiment[];
      const eventDescriptor: DragNDropDescriptor<ExperimentBuckets> = action.payload as DragNDropDescriptor<ExperimentBuckets>;
      const draggedExperiment: Experiment | undefined = nth(
        getExperimentBucketFromId(ownState, eventDescriptor.sourceBucket),
        eventDescriptor.sourceIndex
      );
      if (draggedExperiment === undefined) return ownState;
      const filterOutDraggedExperiment = (
        aBucket: Experiment[]
      ): Experiment[] =>
        aBucket.filter(
          (anExperiment: Experiment): boolean =>
            anExperiment.id !== draggedExperiment.id
        );
      chosenGoldstandards = filterOutDraggedExperiment(
        ownState.chosenGoldStandards
      );
      chosenExperiments = filterOutDraggedExperiment(
        ownState.chosenExperiments
      );
      availableExperiments = filterOutDraggedExperiment(
        ownState.availableExperiments
      );
      switch (eventDescriptor.targetBucket) {
        case ExperimentBuckets.CHOSEN_GOLDSTANDARDS: {
          availableExperiments = [
            ...availableExperiments,
            ...chosenGoldstandards,
          ];
          chosenGoldstandards = insertExperimentAt(
            chosenGoldstandards,
            draggedExperiment,
            eventDescriptor.targetIndex
          );
          break;
        }
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
        ...ownState,
        chosenExperiments: chosenExperiments,
        chosenGoldStandards: chosenGoldstandards,
        availableExperiments: availableExperiments,
      };
    }
    case NMetricsPageActionTypes.INSPECT_AN_EXPERIMENT:
      return {
        ...ownState,
        chosenExperiments: [action.payload as Experiment],
      };
    default:
      return ownState;
  }
};

export const BenchmarkConfiguratorReducer = (
  ownState: BenchmarkConfigurationStore = initialState,
  coreState: CoreStore,
  action: SnowmanAction
): BenchmarkConfigurationStore => {
  const immediateState: BenchmarkConfigurationStore = BenchmarkConfiguratorImmediateReducer(
    ownState,
    coreState,
    action
  );
  const experimentsToIds = (oneExperiment: Experiment): number =>
    oneExperiment.id;
  const cleanUpBucket = (aBucket: Experiment[]): Experiment[] =>
    aBucket.filter(
      (anExperiment: Experiment): boolean =>
        anExperiment.datasetId ===
          (immediateState.selectedDataset?.id ?? MagicNotPossibleId) &&
        coreState.experiments.map(experimentsToIds).includes(anExperiment.id)
    );
  const finalChosenExperiments: Experiment[] = cleanUpBucket(
    immediateState.chosenExperiments
  );
  const finalChosenGoldStandards: Experiment[] = cleanUpBucket(
    immediateState.chosenGoldStandards
  );
  const alreadyChosenExperiments: Experiment[] = unionBy(
    finalChosenExperiments,
    finalChosenGoldStandards,
    'id'
  );
  const remainingKnownExperiments: Experiment[] = differenceBy(
    immediateState.availableExperiments,
    alreadyChosenExperiments,
    'id'
  );
  return {
    ...immediateState,
    chosenExperiments: finalChosenExperiments,
    chosenGoldStandards: finalChosenGoldStandards,
    availableExperiments: [
      ...remainingKnownExperiments,
      ...differenceBy(
        coreState.experiments.filter(
          (anExperiment: Experiment): boolean =>
            anExperiment.datasetId ===
            (ownState.selectedDataset?.id ?? MagicNotPossibleId)
        ),
        unionBy(alreadyChosenExperiments, remainingKnownExperiments, 'id'),
        'id'
      ),
    ].filter((anExperiment: Experiment): boolean =>
      immediateState.selectedMatchingSolutions.length > 0
        ? immediateState.selectedMatchingSolutions.find(
            (aMatchingSolution: Algorithm): boolean =>
              anExperiment.algorithmId === aMatchingSolution.id
          ) !== undefined
        : true
    ),
  };
};
