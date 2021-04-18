import { ViewIDs } from 'types/ViewIDs';

export interface TabBarConfigItem {
  viewID: ViewIDs;
  title: string;
}

const TabBarConfig: TabBarConfigItem[] = [
  {
    viewID: ViewIDs.HOME,
    title: 'Snowman',
  },
  {
    viewID: ViewIDs.DASHBOARD,
    title: 'Benchmark',
  },
  {
    viewID: ViewIDs.DATASETS,
    title: 'Datasets',
  },
  {
    viewID: ViewIDs.EXPERIMENTS,
    title: 'Experiments',
  },
  {
    viewID: ViewIDs.ALGORITHMS,
    title: 'Matching Solutions',
  },
];

export default TabBarConfig;
