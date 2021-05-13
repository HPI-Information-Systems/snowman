import { Algorithm, Dataset } from 'api';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import { ChangeEvent } from 'react';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { IonChangeEvent, IonSelectChangeEvent } from 'types/IonChangeEvent';

export interface ExperimentDialogDispatchProps {
  clickOnCancel(): void;
  changeExperimentName(event: IonChangeEvent): void;
  changeExperimentDescription(event: IonChangeEvent): void;
  changeExperimentFileFormat(anOption: string): void;
  clickOnSubmit(): void;
  changeSelectedFiles(event: ChangeEvent<HTMLInputElement>): void;
  changeDataset(event: IonSelectChangeEvent): void;
  changeAlgorithm(event: IonSelectChangeEvent): void;
}

export interface ExperimentDialogStateProps {
  isAddDialog: boolean;
  experimentName: string;
  experimentDescription: string;
  experimentFileFormat: experimentFileFormatEnum;
  isValidForm: boolean;
  selectedFiles: File[];
  datasets: Dataset[];
  selectedDataset: string | undefined;
  algorithms: Algorithm[];
  selectedAlgorithm: string | undefined;
}

export type ExperimentDialogOwnProps = DialogProps;

export type ExperimentDialogProps = ExperimentDialogOwnProps &
  ExperimentDialogStateProps &
  ExperimentDialogDispatchProps;
