export interface DashboardPageStateProps {
  isVennDiagramRendered: boolean;
  isBinaryMetricsDisabled: boolean;
  isNMetricsDisabled: boolean;
}

export interface DashboardPageDispatchProps {
  loadCounts(): void;
  openIntersectionPage(): void;
  openNMetricsPage(): void;
  openBinaryMetricsPage(): void;
}

export type DashboardPageProps = DashboardPageDispatchProps &
  DashboardPageStateProps;
