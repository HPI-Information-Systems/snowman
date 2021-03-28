import {
  albums,
  calculator,
  documents,
  grid,
  home,
  pauseCircle,
  pieChart,
  rocket,
} from 'ionicons/icons';
import AlgorithmsPage from 'pages/AlgorithmsPage/AlgorithmsPage';
import BinaryMetricsPage from 'pages/BinaryMetricsPage/BinaryMetricsPage';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
import DatasetsPage from 'pages/DatasetsPage/DatasetsPage';
import ExperimentsPage from 'pages/ExperimentsPage/ExperimentsPage';
import IntersectionPage from 'pages/IntersectionPage/IntersectionPage';
import NMetricsPage from 'pages/NMetricsPage/NMetricsPage';
import RootPage from 'pages/RootPage/RootPage';
import { menuCategories } from 'types/MenuCategories';
import { ViewIDs } from 'types/ViewIDs';
import { ViewMetaInformation } from 'types/ViewMetaInformation';
import * as accessGuards from 'utils/accessGuards';
import {
  emptySelectedOptions,
  selectedDataset,
  selectedExperiments,
  selectedMatchingSolutions,
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
    nextView: ViewIDs.DATASETS,
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.GENERAL,
    menuIcon: rocket,
    menuName: 'Matching Solutions',
    menuSortKey: 2,
    selectedOptionsReminder: selectedMatchingSolutions,
  },
  {
    key: ViewIDs.DATASETS,
    component: DatasetsPage,
    nextView: ViewIDs.EXPERIMENTS,
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.CONFIGURATION,
    menuName: 'Datasets',
    menuIcon: albums,
    menuSortKey: 3,
    selectedOptionsReminder: selectedDataset,
  },
  {
    key: ViewIDs.EXPERIMENTS,
    component: ExperimentsPage,
    nextView: ViewIDs.DASHBOARD,
    accessGuard: accessGuards.couldEnterExperimentsSelector,
    shouldShowInMenu: true,
    menuCategory: menuCategories.CONFIGURATION,
    menuName: 'Experiments',
    menuIcon: documents,
    menuSortKey: 4,
    selectedOptionsReminder: selectedExperiments,
  },
  {
    key: ViewIDs.DASHBOARD,
    component: DashboardPage,
    nextView: ViewIDs.DASHBOARD,
    accessGuard: accessGuards.couldEnterDashboardPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.EVALUATION,
    menuName: 'Dashboard',
    menuIcon: grid,
    menuSortKey: 5,
    selectedOptionsReminder: emptySelectedOptions,
  },
  {
    key: ViewIDs.BINARY_METRICS,
    component: BinaryMetricsPage,
    nextView: ViewIDs.BINARY_METRICS,
    accessGuard: accessGuards.couldEnterBinaryMetricsPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.EVALUATION,
    menuName: 'Binary Metrics',
    menuIcon: pauseCircle,
    menuSortKey: 6,
    selectedOptionsReminder: emptySelectedOptions,
  },
  {
    key: ViewIDs.N_METRICS,
    component: NMetricsPage,
    nextView: ViewIDs.BINARY_METRICS,
    accessGuard: accessGuards.couldEnterNMetricsPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.EVALUATION,
    menuName: 'N-ary Metrics',
    menuIcon: calculator,
    menuSortKey: 7,
    selectedOptionsReminder: emptySelectedOptions,
  },
  {
    key: ViewIDs.INTERSECTION,
    component: IntersectionPage,
    nextView: ViewIDs.N_METRICS,
    accessGuard: accessGuards.couldEnterIntersectionPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.EVALUATION,
    menuName: 'Intersection',
    menuIcon: pieChart,
    menuSortKey: 8,
    selectedOptionsReminder: emptySelectedOptions,
  },
];
