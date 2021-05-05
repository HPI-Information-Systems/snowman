import { DialogRenderConfiguration } from 'apps/SnowmanApp/types/DialogRenderConfiguration';
import { EntityId } from 'types/EntityId';
import { ViewIDs } from 'types/ViewIDs';

export interface RenderLogicModel {
  currentViewID: ViewIDs;
  entityId: EntityId;
  dialogStack: DialogRenderConfiguration[];
}
