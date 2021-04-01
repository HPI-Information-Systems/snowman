import { ExperimentValuesSoftKPIs } from 'api';
import { ChangeEvent } from 'react';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { IonChangeEvent } from 'types/IonChangeEvent';

export enum SoftKPIsTypesEnum {
  timeToConfigure,
  implementationKnowHowLevel,
}

export interface ExperimentDialogDispatchProps {
  closeDialog(): void;
  clickOnCancel(): void;
  changeExperimentName(event: IonChangeEvent): void;
  changeExperimentDescription(event: IonChangeEvent): void;
  changeExperimentFileFormat(anOption: string): void;
  changeSoftKPIs(event: IonChangeEvent, type: SoftKPIsTypesEnum): void;
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
  softKPIs: ExperimentValuesSoftKPIs;
}

export type ExperimentDialogProps = ExperimentDialogStateProps &
  ExperimentDialogDispatchProps;
