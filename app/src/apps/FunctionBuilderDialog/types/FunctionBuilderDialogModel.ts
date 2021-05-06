import { SimilarityThresholdFunctionDefinition } from 'api';
import { FunctionBuildingBlock } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export interface FunctionBuilderDialogModel {
  operator: SimilarityThresholdFunctionDefinition;
  functionBuildingStack: FunctionBuildingBlock;
}
