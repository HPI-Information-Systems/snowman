import DashboardPageView from 'pages/DashboardPage/DashboardPage.View';
import { DashboardPageDispatchProps } from 'pages/DashboardPage/DashboardPageProps';
import { connect } from 'react-redux';
import { loadCounts } from 'store/actions/IntersectionStoreActions';
import { navigateTo } from 'store/actions/RenderStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { ViewIDs } from 'types/ViewIDs';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DashboardPageDispatchProps => {
  return {
    loadCounts() {
      return dispatch(loadCounts());
    },
    gotoIntersectionPage() {
      dispatch(navigateTo(ViewIDs.INTERSECTION));
    },
  };
};

const DashboardPage = connect(undefined, mapDispatchToProps)(DashboardPageView);

export default DashboardPage;
