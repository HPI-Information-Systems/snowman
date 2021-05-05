import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';

export interface FunctionBuilderDialogDispatchProps {
  clickOnCancel(): void;
  clickOnAddOrUpdate(): void;
}

export type FunctionBuilderDialogOwnProps = DialogProps;

export type FunctionBuilderDialogProps = FunctionBuilderDialogDispatchProps &
  FunctionBuilderDialogOwnProps;
