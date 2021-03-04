import {
  albums,
  documents,
  extensionPuzzle,
  home,
  rocket,
  speedometer,
} from 'ionicons/icons';
import AlgorithmsPage from 'pages/AlgorithmsPage/AlgorithmsPage';
import BenchmarkConfiguratorPage from 'pages/BenchmarkConfiguratorPage/BenchmarkConfiguratorPage';
import BinaryMetricsPage from 'pages/BinaryMetricsPage/BinaryMetricsPage';
import DatasetsPage from 'pages/DatasetsPage/DatasetsPage';
import ExperimentsPage from 'pages/ExperimentsPage/ExperimentsPage';
import RootPage from 'pages/RootPage/RootPage';
import { combineReducers } from 'redux';
import { RouterStoreActionTypes as actionTypes } from 'store/actions/actionTypes';
import { SnowmanAction } from 'store/messages';
import { ImmediateStore, RenderLogicStore, Store } from 'store/models';
import { AddExperimentDialogReducer } from 'store/reducers/AddExperimentDialogReducer';
import { AlgorithmDialogReducer } from 'store/reducers/AlgorithmDialogReducer';
import { AlgorithmsReducer } from 'store/reducers/AlgorithmsReducer';
import { DatasetDialogReducer } from 'store/reducers/DatasetDialogReducer';
import { DatasetsReducer } from 'store/reducers/DatasetsReducer';
import { ExperimentsReducer } from 'store/reducers/ExperimentsReducer';
import { GlobalIndicatorReducer } from 'store/reducers/GlobalIndicatorReducer';
import { InputChipReducer } from 'store/reducers/InputChipReducer';
import { MetricsReducer } from 'store/reducers/MetricsReducer';
import { menuCategories } from 'types/MenuCategories';
import { ViewMetaInformation } from 'types/ViewMetaInformation';
import * as accessGuards from 'utils/navigationGuards';
import {
  emptySelectedOptions,
  selectedDataset,
  selectedExperiments,
  selectedMetrics,
} from 'utils/optionReminders';
import { couldNavigateToView, getNextViewId } from 'utils/viewMetaInfoHandlers';

// TODO: fix chunking and move parts to its related area

export enum ViewIDs {
  HOME,
  DATASETS,
  EXPERIMENTS,
  ALGORITHMS,
  BENCHMARK_CONFIGURATOR,
  BINARY_METRICS,
}

export const PrimaryViewMetaInformation = {
  key: ViewIDs.HOME,
  component: RootPage,
  nextView: ViewIDs.DATASETS,
  accessGuard: accessGuards.couldAlwaysEnterPage,
  shouldShowInMenu: true,
  menuCategory: menuCategories.GENERAL,
  menuName: 'Home',
  menuIcon: home,
  menuSortKey: 1,
  selectedOptionsReminder: emptySelectedOptions,
};
export const ViewMetaInformationCollection: ViewMetaInformation[] = [
  PrimaryViewMetaInformation,
  {
    key: ViewIDs.ALGORITHMS,
    component: AlgorithmsPage,
    nextView: ViewIDs.ALGORITHMS,
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.GENERAL,
    menuIcon: rocket,
    menuName: 'Matching Solutions',
    menuSortKey: 2,
    selectedOptionsReminder: emptySelectedOptions,
  },
  {
    key: ViewIDs.DATASETS,
    component: DatasetsPage,
    nextView: ViewIDs.EXPERIMENTS,
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.WORKFLOW,
    menuName: 'Datasets',
    menuIcon: albums,
    menuSortKey: 3,
    selectedOptionsReminder: selectedDataset,
  },
  {
    key: ViewIDs.EXPERIMENTS,
    component: ExperimentsPage,
    nextView: ViewIDs.BENCHMARK_CONFIGURATOR,
    accessGuard: accessGuards.couldEnterExperimentsSelector,
    shouldShowInMenu: true,
    menuCategory: menuCategories.WORKFLOW,
    menuName: 'Experiments',
    menuIcon: documents,
    menuSortKey: 4,
    selectedOptionsReminder: selectedExperiments,
  },
  {
    key: ViewIDs.BENCHMARK_CONFIGURATOR,
    component: BenchmarkConfiguratorPage,
    nextView: ViewIDs.BINARY_METRICS,
    accessGuard: accessGuards.couldEnterMetricsViewer,
    shouldShowInMenu: true,
    menuCategory: menuCategories.WORKFLOW,
    menuIcon: extensionPuzzle,
    menuName: 'Benchmark Configurator',
    menuSortKey: 5,
    selectedOptionsReminder: emptySelectedOptions,
  },
  {
    key: ViewIDs.BINARY_METRICS,
    component: BinaryMetricsPage,
    nextView: ViewIDs.BINARY_METRICS,
    accessGuard: accessGuards.couldEnterMetricsViewer,
    shouldShowInMenu: true,
    menuCategory: menuCategories.WORKFLOW,
    menuName: 'Binary Metrics',
    menuIcon: speedometer,
    menuSortKey: 6,
    selectedOptionsReminder: selectedMetrics,
  },
];

const initialRenderLogicState: RenderLogicStore = {
  currentViewID: ViewIDs.HOME,
  couldGoNext: true,
};

const handleNavigateToViewId = (
  targetViewID: ViewIDs,
  baseline: RenderLogicStore,
  immediateState: ImmediateStore
): Store => {
  if (couldNavigateToView(targetViewID, immediateState)) {
    return {
      ...immediateState,
      RenderLogicStore: {
        currentViewID: targetViewID,
        couldGoNext: couldNavigateToView(
          getNextViewId({
            currentViewID: targetViewID,
            // getNextViewId ignores access guard
            couldGoNext: false,
          }),
          immediateState
        ),
      },
    };
  }
  return {
    ...immediateState,
    RenderLogicStore: baseline,
  };
};

export const RenderLogicReducer = (
  baseline: RenderLogicStore = initialRenderLogicState,
  immediateState: ImmediateStore,
  action: SnowmanAction
): Store => {
  switch (action.type) {
    case actionTypes.NAVIGATE_TO:
      return handleNavigateToViewId(
        action.payload as ViewIDs,
        baseline,
        immediateState
      );
    case actionTypes.NAVIGATE_NEXT:
      return handleNavigateToViewId(
        getNextViewId(baseline),
        baseline,
        immediateState
      );
    default:
      return {
        ...immediateState,
        RenderLogicStore: {
          ...baseline,
          couldGoNext: couldNavigateToView(
            getNextViewId(baseline),
            immediateState
          ),
        },
      };
  }
};
export const rootReducer = (state: Store, action: SnowmanAction): Store => {
  const immediateState: ImmediateStore = combineReducers({
    DatasetsStore: DatasetsReducer,
    ExperimentsStore: ExperimentsReducer,
    AlgorithmsStore: AlgorithmsReducer,
    DatasetDialogStore: DatasetDialogReducer,
    AddExperimentDialogStore: AddExperimentDialogReducer,
    AlgorithmDialogStore: AlgorithmDialogReducer,
    GlobalIndicatorStore: GlobalIndicatorReducer,
    MetricsStore: MetricsReducer,
    InputChipStore: InputChipReducer,
  })(state, action);
  return RenderLogicReducer(
    state?.RenderLogicStore ?? initialRenderLogicState,
    immediateState,
    action
  );
};
