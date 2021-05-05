import ActivityIndicatorView from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicator.View';
import { ActivityIndicatorStateProps } from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicatorProps';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';
import GenericStoreComponentFactory from 'utils/GenericStoreComponentFactory';

const mapStateToProps = (
  state: SnowmanAppModel
): ActivityIndicatorStateProps => ({
  existsActiveRequest: state.ActionLogicStore.ongoingRequestsCount > 0,
});

export const ActivityIndicator = GenericStoreComponentFactory(
  SnowmanAppMagistrate,
  connect(mapStateToProps)(ActivityIndicatorView)
);

export default ActivityIndicator;
