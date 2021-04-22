import {
  accessibility,
  albums,
  fileTrayFull,
  rocket,
  speedometer,
} from 'ionicons/icons';
import { ViewIDs } from 'types/ViewIDs';

export interface TabBarConfigItem {
  viewID: ViewIDs;
  title: string;
  icon?: string;
}

export const TabBarConfigLeft: TabBarConfigItem[] = [
  {
    viewID: ViewIDs.DASHBOARD,
    title: 'Benchmark',
    icon: speedometer,
  },
  {
    viewID: ViewIDs.DATASETS,
    title: 'Datasets',
    icon: fileTrayFull,
  },
  {
    viewID: ViewIDs.EXPERIMENTS,
    title: 'Experiments',
    icon: albums,
  },
  {
    viewID: ViewIDs.ALGORITHMS,
    title: 'Matching Solutions',
    icon: rocket,
  },
];

export const TabBarConfigRight: TabBarConfigItem[] = [
  {
    viewID: ViewIDs.HOME,
    title: 'About',
    icon: accessibility,
  },
];
