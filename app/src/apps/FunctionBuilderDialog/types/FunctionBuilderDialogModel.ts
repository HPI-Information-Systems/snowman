import { FunctionBuildingBlock } from 'apps/FunctionBuilderDialog/types/FunctionBuildingBlock';

export interface FunctionBuilderDialogModel {
  functionBuildingStack: FunctionBuildingBlock;
  reservedAccessKeys: number[];
  functionName: string;
  experimentColumns: string[];
}
