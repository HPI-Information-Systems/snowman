import { SnowmanGenericDispatch } from 'store/messages';

export interface DatasetsAppModel {
  selectedTags: string[];
}

export type DatasetsAppDispatch = SnowmanGenericDispatch<DatasetsAppModel>;
