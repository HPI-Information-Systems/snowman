import { ChangeEvent } from 'react';
import { DatasetTypes } from 'types/DatasetTypes';
import { IonChangeEvent } from 'types/IonChangeEvent';

export interface AddDatasetDialogDispatchProps {
  closeDialog(): void;
  clickOnCancel(): void;
  addNewTagCallback(newTagValue: string): void;
  changeDatasetName(event: IonChangeEvent): void;
  changeDatasetDescription(event: IonChangeEvent): void;
  changeDatasetType(event: IonChangeEvent): void;
  changeDatasetLength(event: IonChangeEvent): void;
  changeCsvIdColumn(event: IonChangeEvent): void;
  changeCsvSeparator(event: IonChangeEvent): void;
  changeCsvQuote(event: IonChangeEvent): void;
  changeCsvEscape(event: IonChangeEvent): void;
  clickOnATag(aTag: string): void;
  addDataset(): void;
  changeSelectedDatasetFiles(event: ChangeEvent<HTMLInputElement>): void;
}

export interface AddDatasetDialogStateProps {
  isOpen: boolean;
  isValidForm: boolean;
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

export type AddDatasetDialogProps = AddDatasetDialogDispatchProps &
  AddDatasetDialogStateProps;
