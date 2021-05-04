export interface SimilarityFuncItemOwnProps {
  functionName: string;
}

export interface SimilarityFuncItemDispatchProps {
  openEditFunctionBuilder(): void;
}

export type SimilarityFuncItemProps = SimilarityFuncItemDispatchProps &
  SimilarityFuncItemOwnProps;
