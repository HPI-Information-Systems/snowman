import {
  SimilarityThresholdFunctionDefinition,
  SimilarityThresholdFunctionDefinitionTypeEnum,
} from 'api';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';

export interface FunctionBuilderDialogStateProps {
  operator: SimilarityThresholdFunctionDefinition;
}

export interface FunctionBuilderDialogDispatchProps {
  clickOnCancel(): void;
  clickOnAddOrUpdate(): void;
  selectRootType(aType: SimilarityThresholdFunctionDefinitionTypeEnum): void;
}

export type FunctionBuilderDialogOwnProps = DialogProps;

export type FunctionBuilderDialogProps = FunctionBuilderDialogDispatchProps &
  FunctionBuilderDialogOwnProps &
  FunctionBuilderDialogStateProps;
