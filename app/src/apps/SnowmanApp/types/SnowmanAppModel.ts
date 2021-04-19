import { ActionLogicModel } from 'apps/SnowmanApp/types/ActionLogicModel';
import { RenderLogicModel } from 'apps/SnowmanApp/types/RenderLogicModel';

export interface SnowmanAppModel {
  RenderLogicStore: RenderLogicModel;
  ActionLogicStore: ActionLogicModel;
}
