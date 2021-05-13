import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import ConstantStrategy from 'apps/FunctionBuilderDialog/components/ConstantStrategy/ConstantStrategy';
import OperatorStrategy from 'apps/FunctionBuilderDialog/components/OperatorStrategy/OperatorStrategy';
import SimilarityThresholdStrategy from 'apps/FunctionBuilderDialog/components/SimilarityThresholdStrategy/SimilarityThresholdStrategy';
import { StrategyMapperForwardProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import UnaryOperatorStrategy from 'apps/FunctionBuilderDialog/components/UnaryOperatorStrategy/UnaryOperatorStrategy';
import { FunctionBuildingBlockType } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';
import { FC } from 'react';

export const StrategyMap: Map<
  FunctionBuildingBlockType,
  FC<StrategyMapperForwardProps>
> = new Map([
  [SimilarityThresholdFunctionDefinitionTypeEnum.Operator, OperatorStrategy],
  [
    SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold,
    SimilarityThresholdStrategy,
  ],
  [
    SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator,
    UnaryOperatorStrategy,
  ],
  [SimilarityThresholdFunctionDefinitionTypeEnum.Constant, ConstantStrategy],
]);
