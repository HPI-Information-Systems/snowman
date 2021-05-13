import ActionLogicReducer from 'apps/SnowmanApp/store/ActionLogicReducer';
import CentralResourcesReducer from 'apps/SnowmanApp/store/CentralResourcesReducer';
import RenderLogicReducer from 'apps/SnowmanApp/store/RenderLogicReducer';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { SnowmanAction } from 'types/SnowmanAction';

const SnowmanAppReducer = (
  state: SnowmanAppModel | undefined,
  action: SnowmanAction
): SnowmanAppModel => ({
  ActionLogicStore: ActionLogicReducer(state?.ActionLogicStore, action),
  RenderLogicStore: RenderLogicReducer(state?.RenderLogicStore, action),
  CentralResourcesStore: CentralResourcesReducer(
    state?.CentralResourcesStore,
    action
  ),
});

export default SnowmanAppReducer;
