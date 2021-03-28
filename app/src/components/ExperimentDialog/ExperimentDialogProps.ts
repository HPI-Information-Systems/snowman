import { ChangeEvent } from 'react';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface ExperimentDialogDispatchProps {
  closeDialog(): void;
  clickOnCancel(): void;
  changeExperimentName(event: IonChangeEvent): void;
  changeExperimentDescription(event: IonChangeEvent): void;
  changeExperimentFileFormat(anOption: string): void;
  changeTimeToConfigure(event: IonChangeEvent): void;
  clickOnMatchingSolutionTag(aTag: string): void;
  clickOnSubmit(): void;
  changeSelectedFiles(event: ChangeEvent<HTMLInputElement>): void;
}

export interface ExperimentDialogStateProps {
  isOpen: boolean;
  isAddDialog: boolean;
  experimentName: string;
  experimentDescription: string;
  experimentFileFormat: experimentFileFormatEnum;
  tags: string[];
  selectedTags: string[];
  isValidForm: boolean;
  selectedFiles: File[];
  timeToConfigure: number | undefined;
}

export type ExperimentDialogProps = ExperimentDialogStateProps &
  ExperimentDialogDispatchProps;
