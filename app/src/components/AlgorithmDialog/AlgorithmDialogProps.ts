import { IonChangeEvent } from 'types/IonChangeEvent';

export interface AlgorithmDialogStateProps {
  algorithmName: string;
  isOpen: boolean;
  algorithmDescription: string;
  isAddDialog: boolean;
}

export interface AlgorithmDialogDispatchProps {
  clickOnCancel(): void;
  closeDialog(): void;
  changeAlgorithmName(event: IonChangeEvent): void;
  changeAlgorithmDescription(event: IonChangeEvent): void;
  clickOnSubmit(): void;
}

export type AlgorithmDialogProps = AlgorithmDialogStateProps &
  AlgorithmDialogDispatchProps;
