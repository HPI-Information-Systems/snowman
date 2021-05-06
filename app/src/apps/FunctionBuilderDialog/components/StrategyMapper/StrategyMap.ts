import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import ConstantStrategy from 'apps/FunctionBuilderDialog/components/ConstantStrategy/ConstantStrategy';
import OperatorStrategy from 'apps/FunctionBuilderDialog/components/OperatorStrategy/OperatorStrategy';
import SimilarityThresholdStrategy from 'apps/FunctionBuilderDialog/components/SimilarityThresholdStrategy/SimilarityThresholdStrategy';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import UnaryOperatorStrategy from 'apps/FunctionBuilderDialog/components/UnaryOperatorStrategy/UnaryOperatorStrategy';
import { FC } from 'react';

export interface StrategyMapItem {
  targetStrategyComponent: FC<StrategyMapperForwardProps>;
  targetStrategyKey: string;
}

export const StrategyMap: StrategyMapItem[] = [
  {
    targetStrategyComponent: OperatorStrategy,
    targetStrategyKey: SimilarityThresholdFunctionDefinitionTypeEnum.Operator,
  },
  {
    targetStrategyComponent: SimilarityThresholdStrategy,
    targetStrategyKey:
      SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
  },
  {
    targetStrategyComponent: UnaryOperatorStrategy,

    targetStrategyKey:
      SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator,
  },
  {
    targetStrategyComponent: ConstantStrategy,
    targetStrategyKey: SimilarityThresholdFunctionDefinitionTypeEnum.Constant,
  },
];
