import AlgorithmsPage from 'pages/AlgorithmsPage/AlgorithmsPage';
import BinaryMetricsPage from 'pages/BinaryMetricsPage/BinaryMetricsPage';
import DashboardPage from 'pages/DashboardPage/DashboardPage';
import DatasetsPage from 'pages/DatasetsPage/DatasetsPage';
import ExperimentsPage from 'pages/ExperimentsPage/ExperimentsPage';
import IntersectionPage from 'pages/IntersectionPage/IntersectionPage';
import NMetricsPage from 'pages/NMetricsPage/NMetricsPage';
import RootPage from 'pages/RootPage/RootPage';
import StandaloneDataViewerPage from 'pages/StandaloneDataViewerPage/StandaloneDataViewerPage';
import { ViewIDs } from 'types/ViewIDs';
import { ViewMetaInformation } from 'types/ViewMetaInformation';
import * as accessGuards from 'utils/accessGuards';

export const PrimaryViewMetaInformation: ViewMetaInformation = {
  key: ViewIDs.HOME,
  component: RootPage,
  accessGuard: accessGuards.couldAlwaysEnterPage,
};

export const ViewMetaInformationCollection: ViewMetaInformation[] = [
  PrimaryViewMetaInformation,
  {
    key: ViewIDs.ALGORITHMS,
    component: AlgorithmsPage,
    accessGuard: accessGuards.couldAlwaysEnterPage,
  },
  {
    key: ViewIDs.DATASETS,
    component: DatasetsPage,
    accessGuard: accessGuards.couldAlwaysEnterPage,
  },
  {
    key: ViewIDs.EXPERIMENTS,
    component: ExperimentsPage,
    accessGuard: accessGuards.couldEnterExperimentsSelector,
  },
  {
    key: ViewIDs.DASHBOARD,
    component: DashboardPage,
    accessGuard: accessGuards.couldEnterDashboardPage,
  },
  {
    key: ViewIDs.BINARY_METRICS,
    component: BinaryMetricsPage,
    accessGuard: accessGuards.couldEnterBinaryMetricsPage,
  },
  {
    key: ViewIDs.N_METRICS,
    component: NMetricsPage,
    accessGuard: accessGuards.couldEnterNMetricsPage,
  },
  {
    key: ViewIDs.INTERSECTION,
    component: IntersectionPage,
    accessGuard: accessGuards.couldEnterIntersectionPage,
  },
  {
    key: ViewIDs.STANDALONE_DATA_VIEWER,
    component: StandaloneDataViewerPage,
    accessGuard: accessGuards.couldNeverEnterPage,
    hideSideMenu: true,
  },
];
