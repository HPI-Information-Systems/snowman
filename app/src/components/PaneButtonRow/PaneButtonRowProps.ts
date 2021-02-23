import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

export type PaneButtonRowProps = {
  paneTitles: MetricsTuplesCategories[];
  selectedPaneTitle: MetricsTuplesCategories;
  onSelect(paneTitle: MetricsTuplesCategories): void;
};
