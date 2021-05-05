import { SimilarityThresholdFunctionDefinition } from 'api';
import { FunctionElementField } from 'apps/FunctionBuilderDialog/types/FunctionElementField';

export interface FunctionBuilderDialogModel {
  operator: SimilarityThresholdFunctionDefinition;
  functionElementFields: FunctionElementField[];
}
