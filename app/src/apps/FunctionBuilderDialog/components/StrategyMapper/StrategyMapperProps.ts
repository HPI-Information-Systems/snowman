import { SimilarityThresholdFunctionDefinitionTypeEnum } from 'api';

export interface StrategyMapperProps {
  targetStrategyType: SimilarityThresholdFunctionDefinitionTypeEnum;
  children?: JSX.Element;
}
