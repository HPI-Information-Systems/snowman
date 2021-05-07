import { SimilarityThresholdFunctionValues } from '.';

export interface AddSimilarityThresholdFunctionRequest {
  similarityThresholdFunction: SimilarityThresholdFunctionValues;
}

export interface DeleteSimilarityThresholdFunctionRequest {
  functionId: number;
}

export interface GetSimilarityThresholdFunctionRequest {
  functionId: number;
}

export interface SetSimilarityThresholdFunctionRequest {
  functionId: number;
  similarityThresholdFunction: SimilarityThresholdFunctionValues;
}
