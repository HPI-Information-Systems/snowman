import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import { ChangeEvent } from 'react';
import { DatasetTypes } from 'types/DatasetTypes';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface DatasetDialogDispatchProps {
  clickOnCancel(): void;
  createTag(newTagValue: string): void;
  changeDatasetName(event: IonChangeEvent): void;
  changeDatasetDescription(event: IonChangeEvent): void;
  changeDatasetType(event: IonChangeEvent): void;
  changeDatasetLength(event: IonChangeEvent): void;
  changeCsvIdColumn(event: IonChangeEvent): void;
  changeCsvSeparator(event: IonChangeEvent): void;
  changeCsvQuote(event: IonChangeEvent): void;
  changeCsvEscape(event: IonChangeEvent): void;
  clickOnATag(aTag: string): void;
  clickOnSubmit(): void;
  changeSelectedDatasetFiles(event: ChangeEvent<HTMLInputElement>): void;
}

export interface DatasetDialogStateProps {
  isAddDialog: boolean;
  isValidAnsweredDialog: boolean;
  datasetName: string;
  datasetDescription: string;
  datasetType: DatasetTypes;
  datasetLength: number;
  csvIdColumn: string;
  csvSeparator: string;
  csvQuote: string;
  csvEscape: string;
  tags: string[];
  selectedTags: string[];
  selectedFiles: File[];
}

export type DatasetDialogOwnProps = DialogProps;

export type DatasetDialogProps = DatasetDialogOwnProps &
  DatasetDialogDispatchProps &
  DatasetDialogStateProps;
