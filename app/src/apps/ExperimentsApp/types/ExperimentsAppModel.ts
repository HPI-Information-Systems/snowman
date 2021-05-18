import { SnowmanDispatch } from 'types/SnowmanDispatch';

export interface ExperimentsAppModel {
  selectedAlgorithms: number[];
  selectedDatasets: number[];
}

export type ExperimentsAppDispatch = SnowmanDispatch<ExperimentsAppModel>;
