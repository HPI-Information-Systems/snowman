import { EntityId } from 'types/EntityId';
import { EntityType } from 'types/EntityType';
import { ViewIDs } from 'types/ViewIDs';

export interface DialogRenderConfiguration {
  dialogId: ViewIDs | null;
  entityId: EntityId;
  entityType: EntityType;
}
