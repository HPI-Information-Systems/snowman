import {
  AddSimilarityThresholdFunctionRequest,
  DeleteSimilarityThresholdFunctionRequest,
  GetSimilarityThresholdFunctionRequest,
  GetSimilarityThresholdFunctionsRequest,
  SetSimilarityThresholdFunctionRequest,
  SimilarityThresholdFunction,
  SimilarityThresholdFunctionId,
  SimilarityThresholdFunctionTypeEnum,
} from '../../server/types';

// TODO
export class SimilarityThresholdsProvider {
  addSimilarityThresholdFunction({
    experimentId,
    similarityThresholdFunction,
  }: AddSimilarityThresholdFunctionRequest): SimilarityThresholdFunctionId {
    return 0;
  }

  deleteSimilarityThresholdFunction({
    experimentId,
    functionId,
  }: DeleteSimilarityThresholdFunctionRequest): void {
    return;
  }

  getSimilarityThresholdFunction({
    experimentId,
    functionId,
  }: GetSimilarityThresholdFunctionRequest): SimilarityThresholdFunction {
    return {
      id: 0,
      type: SimilarityThresholdFunctionTypeEnum.SimilarityThreshold,
      similarityThreshold: 'test',
    };
  }

  getSimilarityThresholdFunctions({
    experimentId,
  }: GetSimilarityThresholdFunctionsRequest): SimilarityThresholdFunction[] {
    return [];
  }

  setSimilarityThresholdFunction({
    experimentId,
    functionId,
    similarityThresholdFunction,
  }: SetSimilarityThresholdFunctionRequest): void {
    return;
  }
}
