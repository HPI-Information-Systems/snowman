import {
  ExperimentConfigItemSimilarity,
  SimilarityThresholdFunctionId,
} from '../server/types';

export function getSimilarity(
  threshold?: number,
  func?: SimilarityThresholdFunctionId
): ExperimentConfigItemSimilarity | undefined {
  if (threshold !== undefined && func !== undefined) {
    return {
      func,
      threshold,
    };
  } else if (threshold !== undefined || func !== undefined) {
    throw new Error(
      'Similarity function and threshold must either both be set or omitted.'
    );
  } else {
    return undefined;
  }
}
