import ActivityIndicatorView from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicator.View';
import {
  ActivityIndicatorDispatchProps,
  ActivityIndicatorStateProps,
} from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicatorProps';
import { refreshCentralResources } from 'apps/SnowmanApp/store/CentralResourcesActions';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import GenericStoreComponentFactory from 'utils/GenericStoreComponentFactory';

const mapStateToProps = (
  state: SnowmanAppModel
): ActivityIndicatorStateProps => ({
  existsActiveRequest: state.ActionLogicStore.ongoingRequestsCount > 0,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SnowmanAppModel>
): ActivityIndicatorDispatchProps => ({
  triggerRefresh: () => dispatch(refreshCentralResources()),
});

export const ActivityIndicator = GenericStoreComponentFactory(
  SnowmanAppMagistrate,
  connect(mapStateToProps, mapDispatchToProps)(ActivityIndicatorView)
);

export default ActivityIndicator;
