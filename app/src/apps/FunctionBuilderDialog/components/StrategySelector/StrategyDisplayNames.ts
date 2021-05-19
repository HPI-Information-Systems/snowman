import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';

export const StrategyDisplayNames: Record<string, string> = {
  [SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold]:
    'Dataset Column',
  [SimilarityThresholdFunctionDefinitionTypeEnum.Operator]: 'Binary Operator',
  [SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator]:
    'Unary Operator',
  [SimilarityThresholdFunctionDefinitionTypeEnum.Constant]: 'Constant',
};
