import { Algorithm, Dataset } from 'api';
import { ExperimentSegmentTypeEnum } from 'apps/ExperimentDialog/types/ExperimentSegmentTypeEnum';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import { ChangeEvent } from 'react';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';
import { IonChangeEvent, IonRangeChangeEvent } from 'types/IonChangeEvent';

export interface ExperimentDialogDispatchProps {
  clickOnCancel(): void;
  changeExperimentName(event: IonChangeEvent): void;
  changeExperimentDescription(event: IonChangeEvent): void;
  changeExperimentFileFormat(anOption: string): void;
  clickOnSubmit(): void;
  changeSelectedFiles(event: ChangeEvent<HTMLInputElement>): void;
  changeDataset(experiment: number | undefined): void;
  changeAlgorithm(algorithm: number | undefined): void;
  changeExpertise(event: IonRangeChangeEvent): void;
  changeHRAmount(event: IonChangeEvent): void;
  changeRuntime(event: IonChangeEvent): void;
  toggleSegmentExpansion(aSegment: ExperimentSegmentTypeEnum): void;
}

export interface ExperimentDialogStateProps {
  isAddDialog: boolean;
  experimentName: string;
  experimentDescription: string;
  experimentFileFormat: experimentFileFormatEnum;
  isValidForm: boolean;
  selectedFiles: File[];
  datasets: Dataset[];
  selectedDataset: number | undefined;
  algorithms: Algorithm[];
  selectedAlgorithm: number | undefined;
  expertise: number | undefined;
  hrAmount: number | undefined;
  runtime: number | undefined;
  expandedSegments: ExperimentSegmentTypeEnum[];
}

export type ExperimentDialogOwnProps = DialogProps;

export type ExperimentDialogProps = ExperimentDialogOwnProps &
  ExperimentDialogStateProps &
  ExperimentDialogDispatchProps;
