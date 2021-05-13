import { Dataset, Experiment, SimilarityThresholdFunction } from 'api';
import { PreviewDialogTypes } from 'apps/PreviewDialog/types/PreviewDialogTypes';

export interface PreviewDialogModel {
  type: PreviewDialogTypes | undefined;
  dataset: Dataset | undefined;
  experiment: Experiment | undefined;
  similarityFunction: SimilarityThresholdFunction | undefined;
}
