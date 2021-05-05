import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';
import ConstantStrategy from 'apps/FunctionBuilderDialog/components/ConstantStrategy/ConstantStrategy';
import OperatorStrategy from 'apps/FunctionBuilderDialog/components/OperatorStrategy/OperatorStrategy';
import SimilarityThresholdStrategy from 'apps/FunctionBuilderDialog/components/SimilarityThresholdStrategy/SimilarityThresholdStrategy';
import { StrategyMapperProps } from 'apps/FunctionBuilderDialog/components/StrategyMapper/StrategyMapperProps';
import UnaryOperatorStrategy from 'apps/FunctionBuilderDialog/components/UnaryOperatorStrategy/UnaryOperatorStrategy';
import React from 'react';

const StrategyMapper = ({
  targetStrategyType,
  children,
}: StrategyMapperProps): JSX.Element => (
  <>
    {((): JSX.Element => {
      switch (targetStrategyType) {
        case SimilarityThresholdFunctionDefinitionTypeEnum.Operator:
          return <OperatorStrategy />;
        case SimilarityThresholdFunctionDefinitionTypeEnum.SimilarityThreshold:
          return <SimilarityThresholdStrategy />;
        case SimilarityThresholdFunctionDefinitionTypeEnum.UnaryOperator:
          return <UnaryOperatorStrategy />;
        case SimilarityThresholdFunctionDefinitionTypeEnum.Constant:
          return <ConstantStrategy />;
        default:
          return <>{children}</>;
      }
    })()}
  </>
);

export default StrategyMapper;
