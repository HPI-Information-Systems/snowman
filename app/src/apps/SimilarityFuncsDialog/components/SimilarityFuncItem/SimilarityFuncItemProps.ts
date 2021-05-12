import { SimilarityThresholdFunction } from 'api';

export interface SimilarityFuncItemOwnProps {
  similarityFunction: SimilarityThresholdFunction;
}

export interface SimilarityFuncItemDispatchProps {
  openEditFunctionBuilder(): void;
  deleteFunction(): void;
  previewSimilarityFunction(): void;
}

export type SimilarityFuncItemProps = SimilarityFuncItemDispatchProps &
  SimilarityFuncItemOwnProps;
