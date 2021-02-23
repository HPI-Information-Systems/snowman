import { ChangeEvent } from 'react';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface AddExperimentDialogDispatchProps {
  closeDialog(): void;
  clickOnCancel(): void;
  changeExperimentName(event: IonChangeEvent): void;
  changeExperimentDescription(event: IonChangeEvent): void;
  changeExperimentFileFormat(event: IonChangeEvent): void;
  clickOnMatchingSolutionTag(aTag: string): void;
  addExperiment(): void;
  changeSelectedFiles(event: ChangeEvent<HTMLInputElement>): void;
}

export interface AddExperimentDialogStateProps {
  isOpen: boolean;
  experimentName: string;
  experimentDescription: string;
  experimentFileFormat: experimentFileFormatEnum;
  tags: string[];
  selectedTags: string[];
  isValidForm: boolean;
  selectedFiles: File[];
}

export type AddExperimentDialogProps = AddExperimentDialogStateProps &
  AddExperimentDialogDispatchProps;
