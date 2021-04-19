import { SnowmanGenericDispatch } from 'store/messages';

export interface ExperimentsAppModel {
  selectedAlgorithms: string[];
  selectedDatasets: string[];
}

export type ExperimentsAppDispatch = SnowmanGenericDispatch<ExperimentsAppModel>;
