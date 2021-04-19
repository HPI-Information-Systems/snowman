import { GenericInstanceOwnProps } from 'components/GenericSubInstance/GenericInstanceProps';

export interface GenericDialogStateProps {
  isDialogOpen: boolean;
}

export interface GenericDialogDispatchProps {
  closeDialog(): void;
}

export interface GenericDialogOwnProps extends GenericInstanceOwnProps {
  provideScrollingMechanism?: boolean;
  heading: string;
}

export type GenericDialogProps = GenericDialogDispatchProps &
  GenericDialogStateProps &
  GenericDialogOwnProps;
