import experimentFileFormatEnum from 'types/ExperimentFileFormats';

export interface ExperimentDialogModel {
  experimentName: string;
  experimentDescription: string;
  timeToConfigure: number | undefined;
  experimentFileFormat: experimentFileFormatEnum;
  selectedTags: string[];
  selectedFiles: File[];
}
