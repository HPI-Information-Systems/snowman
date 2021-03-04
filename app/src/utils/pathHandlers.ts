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
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import RootPage from 'pages/RootPage/RootPage';
import React from 'react';
import { Store } from 'store/models';
import history from 'utils/history';
import * as accessGuards from 'utils/navigationGuards';
import {
  emptySelectedOptions,
  ISelectedOptionsMap,
  selectedDataset,
  selectedExperiments,
  selectedMetrics,
} from 'utils/optionReminders';

// use unique string values always because we map them to key props
export enum menuCategories {
  GENERAL = 'General',
  WORKFLOW = 'Workflow',
  UNCATEGORIZED = 'Uncategorized',
}

// use unique string values always because we map them to key props
export enum pathMapperKeys {
  HOME = 'Home',
  UNDEF = 'undefined',
  DATASETS = 'Datasets',
  EXPERIMENTS = 'Experiments',
  ALGORITHMS = 'Matching Solutions',
  BENCHMARK_CONFIGURATOR = 'Benchmark Configurator',
  BINARY_METRICS = 'Binary Metrics',
}

export interface IPathMapper {
  key: string;
  path: string | undefined;
  component: React.LazyExoticComponent<React.FC<unknown>> | React.FC;
  nextPath: string | null;
  shouldShowInMenu: boolean;
  menuCategory: menuCategories;
  menuIcon: string | null;
  // we use -1 if it does not matters
  menuSortKey: number;
  accessGuard(aState: Store): boolean;
  selectedOptionsReminder(selectedOptions: ISelectedOptionsMap): string[];
}

// we need this route directly in the React router
export const getEmptyPath = (): string => '/';
// do not use / as root because it causes rendering issues
export const getPathToRootPage = (): string => '/home';
const getPathToDatasetsSelector = (): string => '/datasets';
const getPathToExperimentsSelector = (): string => '/experiments';
const getPathToAlgorithmsPage = (): string => '/algorithms';
const getPathToBinaryMetricsViewer = (): string => '/binary-metrics';
const getPathToBenchmarkConfigurator = (): string => '/benchmark-configuration';

const getDefaultPathMapper = (): IPathMapper => ({
  key: pathMapperKeys.HOME,
  path: getPathToRootPage(),
  component: RootPage,
  nextPath: getPathToDatasetsSelector(),
  accessGuard: accessGuards.couldAlwaysEnterPage,
  shouldShowInMenu: true,
  menuCategory: menuCategories.GENERAL,
  menuIcon: home,
  menuSortKey: 1,
  selectedOptionsReminder: emptySelectedOptions,
});

export const getPathResolution = (): IPathMapper[] => [
  getDefaultPathMapper(),
  // path mapper for undefined routing
  {
    key: pathMapperKeys.UNDEF,
    path: undefined,
    component: NotFoundPage,
    nextPath: null,
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: false,
    menuCategory: menuCategories.UNCATEGORIZED,
    menuIcon: null,
    menuSortKey: -1,
    selectedOptionsReminder: emptySelectedOptions,
  },
  {
    key: pathMapperKeys.DATASETS,
    path: getPathToDatasetsSelector(),
    component: DatasetsPage,
    nextPath: getPathToExperimentsSelector(),
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.WORKFLOW,
    menuIcon: albums,
    menuSortKey: 2,
    selectedOptionsReminder: selectedDataset,
  },
  {
    key: pathMapperKeys.EXPERIMENTS,
    path: getPathToExperimentsSelector(),
    component: ExperimentsPage,
    nextPath: getPathToBenchmarkConfigurator(),
    accessGuard: accessGuards.couldEnterExperimentsSelector,
    shouldShowInMenu: true,
    menuCategory: menuCategories.WORKFLOW,
    menuIcon: documents,
    menuSortKey: 4,
    selectedOptionsReminder: selectedExperiments,
  },
  {
    key: pathMapperKeys.ALGORITHMS,
    path: getPathToAlgorithmsPage(),
    component: AlgorithmsPage,
    nextPath: null,
    accessGuard: accessGuards.couldAlwaysEnterPage,
    shouldShowInMenu: true,
    menuCategory: menuCategories.GENERAL,
    menuIcon: rocket,
    menuSortKey: 3,
    selectedOptionsReminder: emptySelectedOptions,
  },
  {
    key: pathMapperKeys.BENCHMARK_CONFIGURATOR,
    path: getPathToBenchmarkConfigurator(),
    component: BenchmarkConfiguratorPage,
    nextPath: getPathToBinaryMetricsViewer(),
    accessGuard: accessGuards.couldEnterMetricsViewer,
    shouldShowInMenu: true,
    menuCategory: menuCategories.WORKFLOW,
    menuIcon: extensionPuzzle,
    menuSortKey: 5,
    selectedOptionsReminder: emptySelectedOptions,
  },
  {
    key: pathMapperKeys.BINARY_METRICS,
    path: getPathToBinaryMetricsViewer(),
    component: BinaryMetricsPage,
    nextPath: null,
    accessGuard: accessGuards.couldEnterMetricsViewer,
    shouldShowInMenu: true,
    menuCategory: menuCategories.WORKFLOW,
    menuIcon: speedometer,
    menuSortKey: 6,
    selectedOptionsReminder: selectedMetrics,
  },
];

export const navigateTo = (aRoute: string | undefined): void =>
  history.replace(aRoute ?? getPathToRootPage());

const getCurrentPath = (): string => history.location.pathname;

export const getCurrentPathMapper = (): IPathMapper =>
  getPathResolution().find(
    (aPathMapper: IPathMapper): boolean => aPathMapper.path === getCurrentPath()
  ) ?? getDefaultPathMapper();

const getNextPathMapper = (): IPathMapper =>
  getPathResolution().find(
    (aPathMapper: IPathMapper): boolean =>
      aPathMapper.path === getCurrentPathMapper().nextPath
  ) ?? getDefaultPathMapper();

const getNextPath = (): string =>
  getNextPathMapper().path ?? getPathToRootPage();

export const navigateToNextPage = (): void => navigateTo(getNextPath());

const existsNextPage = (): boolean => getNextPath() !== null;

export const couldNavigateToNextPage = (aState: Store): boolean =>
  existsNextPage() && getNextPathMapper().accessGuard(aState);
