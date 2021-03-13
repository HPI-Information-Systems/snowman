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
import { menuCategories } from 'types/MenuCategories';
import { ViewIDs } from 'types/ViewIDs';
import { ViewMetaInformation } from 'types/ViewMetaInformation';
import * as accessGuards from 'utils/navigationGuards';
import {
  emptySelectedOptions,
  selectedDataset,
  selectedExperiments,
  selectedMetrics,
} from 'utils/optionReminders';

export const PrimaryViewMetaInformation: ViewMetaInformation = {
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
    accessGuard: accessGuards.couldEnterBenchmarkConfigurator,
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
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: false,
    menuCategory: menuCategories.WORKFLOW,
    menuName: 'Binary Metrics',
    menuIcon: speedometer,
    menuSortKey: 6,
    selectedOptionsReminder: selectedMetrics,
  },
];
