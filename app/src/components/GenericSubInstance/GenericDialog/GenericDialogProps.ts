import { DialogProps } from 'components/GenericSubInstance/GenericDialog/DialogProps';
import { GenericInstanceOwnProps } from 'components/GenericSubInstance/GenericInstanceProps';
import { EntityId } from 'types/EntityId';

export interface GenericDialogStateProps {
  isDialogOpen: boolean;
  entityId: EntityId;
  isAddDialog: boolean;
}

export interface GenericDialogDispatchProps {
  closeDialog(): void;
}

export interface GenericDialogOwnProps
  extends Omit<GenericInstanceOwnProps, 'children'> {
  children: (props: DialogProps) => JSX.Element;
  provideScrollingMechanism?: boolean;
  getHeading: (entityId: EntityId) => string;
}

export type GenericDialogProps = GenericDialogDispatchProps &
  GenericDialogStateProps &
  GenericDialogOwnProps;
