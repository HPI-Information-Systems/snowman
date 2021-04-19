import SnowmanAppView from 'apps/SnowmanApp/SnowmanApp.View';
import {
  SnowmanAppDispatchProps,
  SnowmanAppStateProps,
} from 'apps/SnowmanApp/SnowmanAppProps';
import { refreshCentralResources } from 'apps/SnowmanApp/store/CentralResourcesActions';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SnowmanAppModel>
): SnowmanAppDispatchProps => ({
  refreshCentralResources() {
    dispatch(refreshCentralResources()).then();
  },
});

const mapStateToProps = (state: SnowmanAppModel): SnowmanAppStateProps => ({
  algorithms: state.CentralResourcesStore.algorithms,
});

const SnowmanAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SnowmanAppView);

export default SnowmanAppContainer;
