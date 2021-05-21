import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { EntityId } from 'types/EntityId';

export interface DialogProps {
  entityId: EntityId;
  isAddDialog: boolean;
  centralResources: CentralResourcesModel;
}
