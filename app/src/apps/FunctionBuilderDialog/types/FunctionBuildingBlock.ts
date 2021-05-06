import {
  SimilarityThresholdFunctionDefinitionTypeEnum,
  SimilarityThresholdFunctionOperatorOperatorEnum,
} from 'api';

export type FunctionBuildingBlockType = SimilarityThresholdFunctionDefinitionTypeEnum | null;

export interface FunctionBuildingBlock {
  accessKey: number;
  type: FunctionBuildingBlockType;
  left: FunctionBuildingBlock | number | string;
  mid: SimilarityThresholdFunctionOperatorOperatorEnum;
  right: FunctionBuildingBlock | number | string;
}
