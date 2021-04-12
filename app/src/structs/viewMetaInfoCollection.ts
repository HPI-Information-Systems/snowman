import {
  albums,
  analytics,
  calculator,
  colorFilter,
  documents,
  grid,
  home,
  pauseCircle,
  rocket,
} from 'ionicons/icons';
import AlgorithmsPage from 'pages/AlgorithmsPage/AlgorithmsPage';
import BinaryMetricsPage from 'pages/BinaryMetricsPage/BinaryMetricsPage';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
import DatasetsPage from 'pages/DatasetsPage/DatasetsPage';
import ExperimentsPage from 'pages/ExperimentsPage/ExperimentsPage';
import IntersectionPage from 'pages/IntersectionPage/IntersectionPage';
import KPIDiagramPage from 'pages/KPIDiagramPage/KPIDiagramPage';
import NMetricsPage from 'pages/NMetricsPage/NMetricsPage';
import RootPage from 'pages/RootPage/RootPage';
import StandaloneDataViewerPage from 'pages/StandaloneDataViewerPage/StandaloneDataViewerPage';
import { menuCategories } from 'types/MenuCategories';
import { ViewIDs } from 'types/ViewIDs';
import { ViewMetaInformation } from 'types/ViewMetaInformation';
import * as accessGuards from 'utils/accessGuards';
import {
  emptySelectedOptions,
  selectedDataset,
  selectedExperiments,
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
    selectedOptionsReminder: emptySelectedOptions,
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
    menuName: 'Binary Comparison',
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
    menuName: 'Intersections',
    menuIcon: colorFilter,
    menuSortKey: 8,
    selectedOptionsReminder: emptySelectedOptions,
  },
  {
    key: ViewIDs.KPIDIAGRAM,
    component: KPIDiagramPage,
    nextView: ViewIDs.KPIDIAGRAM,
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.EVALUATION,
    menuName: 'KPI Diagrams',
    menuIcon: analytics,
    menuSortKey: 9,
    selectedOptionsReminder: emptySelectedOptions,
    hideSideMenu: false,
  },
  {
    key: ViewIDs.STANDALONE_DATA_VIEWER,
    component: StandaloneDataViewerPage,
    nextView: ViewIDs.STANDALONE_DATA_VIEWER,
    accessGuard: accessGuards.couldNeverEnterPage,
    shouldShowInMenu: false,
    menuCategory: menuCategories.UNCATEGORIZED,
    menuName: '',
    menuIcon: null,
    menuSortKey: -1,
    selectedOptionsReminder: emptySelectedOptions,
    hideSideMenu: true,
  },
];
