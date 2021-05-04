import { SimilarityThresholdFunction } from 'api';
import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import { IonChangeEvent } from 'types/IonChangeEvent';

export type SimilarityFuncsDialogOwnProps = DialogProps;

export interface SimilarityFuncsDialogStateProps {
  similarityThresholdFuncs: SimilarityThresholdFunction[];
  searchString: string;
}

export interface SimilarityFuncsDialogDispatchProps {
  deleteFunction?(): void;
  openAddFunctionBuilder(): void;
  onChangeSearchString(event: IonChangeEvent): void;
}

export type SimilarityFuncsDialogProps = SimilarityFuncsDialogStateProps &
  SimilarityFuncsDialogOwnProps &
  SimilarityFuncsDialogDispatchProps;
