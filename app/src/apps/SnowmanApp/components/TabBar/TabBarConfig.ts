import { ViewIDs } from 'types/ViewIDs';

export interface TabBarConfigItem {
  viewID: ViewIDs;
  title: string;
}

export const TabBarConfigLeft: TabBarConfigItem[] = [
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

export const TabBarConfigRight: TabBarConfigItem[] = [
  {
    viewID: ViewIDs.HOME,
    title: 'Snowman App',
  },
];
