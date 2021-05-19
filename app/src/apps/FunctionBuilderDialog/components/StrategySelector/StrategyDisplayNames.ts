import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';

export const StrategyDisplayNames: Record<
  string,
  SimilarityThresholdFunctionDefinitionTypeEnum
> = {
  'Similarity Column':
    SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
  'Binary Operator': SimilarityThresholdFunctionDefinitionTypeEnum.Operator,
  'Unary Operator': SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator,
  Constant: SimilarityThresholdFunctionDefinitionTypeEnum.Constant,
};
