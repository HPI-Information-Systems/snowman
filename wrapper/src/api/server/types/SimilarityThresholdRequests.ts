import { SimilarityThresholdFunctionValues } from './SimilarityThresholdFunctionValues';

export interface AddSimilarityThresholdFunctionRequest {
  experimentId: number;
  similarityThresholdFunction: SimilarityThresholdFunctionValues;
}

export interface DeleteSimilarityThresholdFunctionRequest {
  experimentId: number;
  functionId: number;
}

export interface GetSimilarityThresholdFunctionRequest {
  experimentId: number;
  functionId: number;
}

export interface GetSimilarityThresholdFunctionsRequest {
  experimentId: number;
}

export interface SetSimilarityThresholdFunctionRequest {
  experimentId: number;
  functionId: number;
  similarityThresholdFunction: SimilarityThresholdFunctionValues;
}
