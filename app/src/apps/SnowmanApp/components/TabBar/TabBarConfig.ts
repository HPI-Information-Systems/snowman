import {
  albums,
  fileTrayFull,
  rocket,
  snow,
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
    viewID: ViewIDs.BenchmarkApp,
    title: 'Benchmark',
    icon: speedometer,
  },
  {
    viewID: ViewIDs.DatasetsApp,
    title: 'Datasets',
    icon: fileTrayFull,
  },
  {
    viewID: ViewIDs.ExperimentsApp,
    title: 'Experiments',
    icon: albums,
  },
  {
    viewID: ViewIDs.AlgorithmsApp,
    title: 'Matching Solutions',
    icon: rocket,
  },
];

export const TabBarConfigRight: TabBarConfigItem[] = [
  {
    viewID: ViewIDs.AboutApp,
    title: 'About',
    icon: snow,
  },
];
