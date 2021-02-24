import { IonChangeEvent } from 'types/IonChangeEvent';

export interface AddAlgorithmDialogStateProps {
  algorithmName: string;
  isOpen: boolean;
  algorithmDescription: string;
  isAddDialog: boolean;
}

export interface AddAlgorithmDialogDispatchProps {
  clickOnCancel(): void;
  closeDialog(): void;
  changeAlgorithmName(event: IonChangeEvent): void;
  changeAlgorithmDescription(event: IonChangeEvent): void;
  clickOnAdd(): void;
}

export type AddAlgorithmDialogProps = AddAlgorithmDialogStateProps &
  AddAlgorithmDialogDispatchProps;
