import { SnowmanDispatch } from 'types/SnowmanDispatch';

export interface DatasetsAppModel {
  selectedTags: string[];
}

export type DatasetsAppDispatch = SnowmanDispatch<DatasetsAppModel>;
