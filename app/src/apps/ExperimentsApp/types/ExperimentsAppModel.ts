import { SnowmanDispatch } from 'types/SnowmanDispatch';

export interface ExperimentsAppModel {
  selectedAlgorithms: string[];
  selectedDatasets: string[];
}

export type ExperimentsAppDispatch = SnowmanDispatch<ExperimentsAppModel>;
