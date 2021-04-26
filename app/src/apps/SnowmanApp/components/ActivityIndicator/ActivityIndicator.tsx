import ActivityIndicatorView from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicator.View';
import { ActivityIndicatorStateProps } from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicatorProps';
import { SnowmanAppMagistrate } from 'apps/SnowmanApp/store/SnowmanAppStore';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';
import storeLink from 'utils/storeLink';

const mapStateToProps = (
  state: SnowmanAppModel
): ActivityIndicatorStateProps => ({
  existsActiveRequest: state.ActionLogicStore.ongoingRequestsCount > 0,
});

export const ActivityIndicator = storeLink(
  SnowmanAppMagistrate.getStore(),
  connect(mapStateToProps)(ActivityIndicatorView)
);

export default ActivityIndicator;
