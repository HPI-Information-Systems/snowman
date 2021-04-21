import experimentFileFormatEnum from 'types/ExperimentFileFormats';

export interface ExperimentDialogModel {
  experimentName: string;
  experimentDescription: string;
  experimentFileFormat: experimentFileFormatEnum;
  selectedTags: string[];
  selectedFiles: File[];
}
