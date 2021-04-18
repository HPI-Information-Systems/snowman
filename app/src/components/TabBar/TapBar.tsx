import TabBarView from 'components/TabBar/TabBar.View';
import {
  TabBarDispatchProps,
  TabBarStateProps,
} from 'components/TabBar/TabBarProps';
import { connect } from 'react-redux';
import { navigateTo } from 'store/actions/RenderStoreActions';
import { SnowmanGlobalSimpleDispatch } from 'store/globalStoreInteractor';
import { Store } from 'store/models';
import { ViewIDs } from 'types/ViewIDs';

const mapStateToProps = (state: Store): TabBarStateProps => ({
  activeSubApp: state.SnowmanGlobalStore.RenderLogicStore.currentViewID,
});

const mapDispatchToProps = (): TabBarDispatchProps => ({
  openSubApp(viewID: ViewIDs) {
    SnowmanGlobalSimpleDispatch(navigateTo(viewID));
  },
});

const TapBar = connect(mapStateToProps, mapDispatchToProps)(TabBarView);

export default TapBar;
