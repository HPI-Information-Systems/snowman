import { IonChangeEvent } from 'types/IonChangeEvent';

export interface AlgorithmDialogOwnProps {
  isOpen: boolean;
  algorithmId: number | null;
}

export interface AlgorithmDialogStateProps {
  algorithmName: string;
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

export type AlgorithmDialogProps = AlgorithmDialogOwnProps &
  AlgorithmDialogStateProps &
  AlgorithmDialogDispatchProps;
