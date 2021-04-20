import { DialogProps } from 'components/GenericSubInstance/GenericDialog/DialogProps';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface AlgorithmDialogStateProps {
  algorithmName: string;
  algorithmDescription: string;
  isAddDialog: boolean;
}

export interface AlgorithmDialogDispatchProps {
  clickOnCancel(): void;
  changeAlgorithmName(event: IonChangeEvent): void;
  changeAlgorithmDescription(event: IonChangeEvent): void;
  clickOnSubmit(): void;
}

export type AlgorithmDialogOwnProps = DialogProps;

export type AlgorithmDialogProps = AlgorithmDialogStateProps &
  AlgorithmDialogDispatchProps &
  AlgorithmDialogOwnProps;
