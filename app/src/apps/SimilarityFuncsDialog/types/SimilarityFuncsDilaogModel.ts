import { SimilarityThresholdFunction } from 'api';

export interface SimilarityFuncsDialogModel {
  similarityFuncs: SimilarityThresholdFunction[];
  searchString: string;
}
