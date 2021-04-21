import { Algorithm, Dataset } from 'api';
import experimentFileFormatEnum from 'types/ExperimentFileFormats';

export interface ExperimentDialogModel {
  experimentName: string;
  experimentDescription: string;
  experimentFileFormat: experimentFileFormatEnum;
  selectedFiles: File[];
  datasets: Dataset[];
  algorithms: Algorithm[];
  selectedDataset: string | undefined;
  selectedAlgorithm: string | undefined;
}
