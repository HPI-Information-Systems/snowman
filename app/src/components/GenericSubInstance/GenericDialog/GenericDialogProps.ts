import { DialogProps } from 'components/GenericSubInstance/GenericDialog/DialogProps';
import { GenericInstanceOwnProps } from 'components/GenericSubInstance/GenericInstanceProps';

export interface GenericDialogStateProps {
  isDialogOpen: boolean;
  entityId: number | null;
}

export interface GenericDialogDispatchProps {
  closeDialog(): void;
}

export interface GenericDialogOwnProps
  extends Omit<GenericInstanceOwnProps, 'children'> {
  children: (props: DialogProps) => JSX.Element;
  provideScrollingMechanism?: boolean;
  heading: string;
}

export type GenericDialogProps = GenericDialogDispatchProps &
  GenericDialogStateProps &
  GenericDialogOwnProps;
