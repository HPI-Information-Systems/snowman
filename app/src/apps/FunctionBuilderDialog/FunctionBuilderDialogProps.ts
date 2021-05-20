import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';

export interface FunctionBuilderDialogDispatchProps {
  clickOnCancel(): void;
  clickOnAddOrUpdate(): void;
  changeFunctionName(newName: string): void;
}

export interface FunctionBuilderDialogStateProps {
  functionName: string;
}

export type FunctionBuilderDialogOwnProps = DialogProps;

export type FunctionBuilderDialogProps = FunctionBuilderDialogDispatchProps &
  FunctionBuilderDialogOwnProps &
  FunctionBuilderDialogStateProps;
