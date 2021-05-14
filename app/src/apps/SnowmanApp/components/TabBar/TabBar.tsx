import TabBarView from 'apps/SnowmanApp/components/TabBar/TabBar.View';
import {
  TabBarDispatchProps,
  TabBarStateProps,
} from 'apps/SnowmanApp/components/TabBar/TabBarProps';
import { navigateTo } from 'apps/SnowmanApp/store/RenderLogicActions';
import { SnowmanAppModel } from 'apps/SnowmanApp/types/SnowmanAppModel';
import { connect } from 'react-redux';
import { NoTabBarViewIDs } from 'structs/NoTabBarViewIDs';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { ViewIDs } from 'types/ViewIDs';

const mapStateToProps = (state: SnowmanAppModel): TabBarStateProps => ({
  activeSubApp: state.RenderLogicStore.currentViewID,
  showTabBar: !NoTabBarViewIDs.has(state.RenderLogicStore.currentViewID),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SnowmanAppModel>
): TabBarDispatchProps => ({
  openSubApp(viewID: ViewIDs) {
    dispatch(navigateTo(viewID));
  },
});

const TabBar = connect(mapStateToProps, mapDispatchToProps)(TabBarView);

export default TabBar;
