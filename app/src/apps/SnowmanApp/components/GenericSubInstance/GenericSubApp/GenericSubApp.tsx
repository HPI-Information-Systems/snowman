import GenericSubAppView from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/GenericSubApp.View';
import { GenericSubAppStateProps } from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/GenericSubAppProps';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';

const mapStateToProps = (state: SnowmanAppModel): GenericSubAppStateProps => ({
  existsActiveRequest: state.ActionLogicStore.ongoingRequestsCount > 0,
  activeApp: state.RenderLogicStore.currentViewID,
  centralResources: state.CentralResourcesStore,
});

const GenericSubApp = connect(mapStateToProps)(GenericSubAppView);

export default GenericSubApp;
