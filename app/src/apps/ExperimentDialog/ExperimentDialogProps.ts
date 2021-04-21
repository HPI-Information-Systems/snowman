import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import { ChangeEvent } from 'react';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface ExperimentDialogDispatchProps {
  clickOnCancel(): void;
  changeExperimentName(event: IonChangeEvent): void;
  changeExperimentDescription(event: IonChangeEvent): void;
  changeExperimentFileFormat(anOption: string): void;
  clickOnMatchingSolutionTag(aTag: string): void;
  clickOnSubmit(): void;
  changeSelectedFiles(event: ChangeEvent<HTMLInputElement>): void;
}

export interface ExperimentDialogStateProps {
  isAddDialog: boolean;
  experimentName: string;
  experimentDescription: string;
  experimentFileFormat: experimentFileFormatEnum;
  tags: string[];
  selectedTags: string[];
  isValidForm: boolean;
  selectedFiles: File[];
}

export type ExperimentDialogOwnProps = DialogProps;

export type ExperimentDialogProps = ExperimentDialogOwnProps &
  ExperimentDialogStateProps &
  ExperimentDialogDispatchProps;
