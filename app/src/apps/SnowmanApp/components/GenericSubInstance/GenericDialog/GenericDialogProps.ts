import { DialogProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericDialog/DialogProps';
import { GenericInstanceOwnProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericInstanceProps';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { EntityId } from 'types/EntityId';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

export interface GenericDialogStateProps {
  isDialogOpen: boolean;
  entityId: EntityId;
  isAddDialog: boolean;
  centralResources: CentralResourcesModel;
}

export interface GenericDialogDispatchProps {
  closeDialog(): void;
}

export interface GenericDialogOwnProps
  extends Omit<GenericInstanceOwnProps, 'children'> {
  children: (props: DialogProps) => JSX.Element;
  provideScrollingMechanism?: boolean;
  getHeading: (entityId: EntityId) => string;
  loadInitialState?: (
    dispatch: SnowmanDispatch<unknown>,
    entityId: EntityId
  ) => void;
  resetDialog?: (dispatch: SnowmanDispatch<unknown>) => void;
}

export type GenericDialogProps = GenericDialogDispatchProps &
  GenericDialogStateProps &
  GenericDialogOwnProps;
