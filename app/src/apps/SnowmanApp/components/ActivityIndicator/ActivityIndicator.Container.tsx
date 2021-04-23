import ActivityIndicatorView from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicator.View';
import { ActivityIndicatorStateProps } from 'apps/SnowmanApp/components/ActivityIndicator/ActivityIndicatorProps';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';

const mapStateToProps = (
  state: SnowmanAppModel
): ActivityIndicatorStateProps => ({
  existsActiveRequest: state.ActionLogicStore.ongoingRequestsCount > 0,
});

const ActivityIndicatorContainer = connect(mapStateToProps)(
  ActivityIndicatorView
);

export default ActivityIndicatorContainer;
