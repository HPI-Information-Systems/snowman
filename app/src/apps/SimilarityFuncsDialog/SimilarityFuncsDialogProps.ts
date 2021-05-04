import { SimilarityThresholdFunctionValues } from 'api';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';

export type SimilarityFuncsDialogOwnProps = DialogProps;

export interface SimilarityFuncsDialogStateProps {
  similarityThresholdFuncs: SimilarityThresholdFunctionValues;
}

export interface SimilarityFuncsDialogDispatchProps {
  deleteFunction?(): void;
}

export type SimilarityFuncsDialogProps = SimilarityFuncsDialogStateProps &
  SimilarityFuncsDialogOwnProps &
  SimilarityFuncsDialogDispatchProps;
