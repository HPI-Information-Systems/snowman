import { DatasetTypes } from 'types/DatasetTypes';
import { DialogTypes } from 'types/DialogTypes';

export interface DatasetDialogModel {
  datasetId: number | null;
  dialogType: DialogTypes;
  isOpen: boolean;
  datasetName: string;
  datasetDescription: string;
  datasetType: DatasetTypes;
  datasetLength: number;
  csvIdColumn: string;
  csvSeparator: string;
  csvQuote: string;
  csvEscape: string;
  availableTags: string[];
  selectedTags: string[];
  selectedFiles: File[];
}
