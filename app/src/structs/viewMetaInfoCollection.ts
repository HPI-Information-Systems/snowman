import { albums, documents, home, rocket, speedometer } from 'ionicons/icons';
import AlgorithmsPage from 'pages/AlgorithmsPage/AlgorithmsPage';
import BinaryMetricsPage from 'pages/BinaryMetricsPage/BinaryMetricsPage';
import DatasetsPage from 'pages/DatasetsPage/DatasetsPage';
import ExperimentsPage from 'pages/ExperimentsPage/ExperimentsPage';
import { NMetricsPage } from 'pages/NMetricsPage/NMetricsPage';
import RootPage from 'pages/RootPage/RootPage';
import { menuCategories } from 'types/MenuCategories';
import { ViewIDs } from 'types/ViewIDs';
import { ViewMetaInformation } from 'types/ViewMetaInformation';
import * as accessGuards from 'utils/navigationGuards';
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
    nextView: ViewIDs.BINARY_METRICS,
    accessGuard: accessGuards.couldEnterExperimentsSelector,
    shouldShowInMenu: true,
    menuCategory: menuCategories.WORKFLOW,
    menuName: 'Experiments',
    menuIcon: documents,
    menuSortKey: 4,
    selectedOptionsReminder: selectedExperiments,
  },
  {
    key: ViewIDs.BINARY_METRICS,
    component: BinaryMetricsPage,
    nextView: ViewIDs.BINARY_METRICS,
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.WORKFLOW,
    menuName: 'Binary Metrics',
    menuIcon: speedometer,
    menuSortKey: 6,
    selectedOptionsReminder: emptySelectedOptions,
  },
  {
    key: ViewIDs.N_METRICS,
    component: NMetricsPage,
    nextView: ViewIDs.BINARY_METRICS,
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: false,
    menuCategory: menuCategories.WORKFLOW,
    menuName: 'N-ary Metrics',
    menuIcon: speedometer,
    menuSortKey: 7,
    selectedOptionsReminder: emptySelectedOptions,
  },
];
