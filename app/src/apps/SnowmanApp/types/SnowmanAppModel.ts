import { ActionLogicModel } from 'apps/SnowmanApp/types/ActionLogicModel';
import { CentralResourcesModel } from 'apps/SnowmanApp/types/CentralResourcesModel';
import { RenderLogicModel } from 'apps/SnowmanApp/types/RenderLogicModel';

export interface SnowmanAppModel {
  RenderLogicStore: RenderLogicModel;
  ActionLogicStore: ActionLogicModel;
  CentralResourcesStore: CentralResourcesModel;
}
