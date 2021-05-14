import { Algorithm, Dataset } from 'api';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';

export interface ExperimentDialogModel {
  experimentName: string;
  experimentDescription: string;
  experimentFileFormat: experimentFileFormatEnum;
  selectedFiles: File[];
  datasets: Dataset[];
  algorithms: Algorithm[];
  selectedDataset: number | undefined;
  selectedAlgorithm: number | undefined;
  hrAmount: number | undefined;
  expertise: number | undefined;
}
