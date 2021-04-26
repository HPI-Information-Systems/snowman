import ActivityIndicatorView from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicator.View';
import { ActivityIndicatorStateProps } from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicatorProps';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';
import storeConnect from 'utils/storeConnect';

const mapStateToProps = (
  state: SnowmanAppModel
): ActivityIndicatorStateProps => ({
  existsActiveRequest: state.ActionLogicStore.ongoingRequestsCount > 0,
});

const ActivityIndicatorContainer = connect(mapStateToProps)(
  ActivityIndicatorView
);

export const ActivityIndicator2 = storeConnect(
  SnowmanAppMagistrate.getStore(),
  mapStateToProps,
  null
)(ActivityIndicatorView);

export default ActivityIndicatorContainer;
