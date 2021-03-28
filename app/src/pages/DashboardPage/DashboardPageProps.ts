export interface DashboardPageStateProps {
  vennDiagramRendered: boolean;
  canShowMetricsPage: boolean;
}

export interface DashboardPageDispatchProps {
  loadCounts(): Promise<void>;
  gotoIntersectionPage(): void;
  gotoMetricsPage(): void;
}

export type DashboardPageProps = DashboardPageDispatchProps &
  DashboardPageStateProps;
