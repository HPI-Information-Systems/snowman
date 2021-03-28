export interface DashboardPageDispatchProps {
  loadCounts(): Promise<void>;
  gotoIntersectionPage(): void;
}

export type DashboardPageProps = DashboardPageDispatchProps;
