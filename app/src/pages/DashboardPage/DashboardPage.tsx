import { connect } from 'react-redux';

import { loadCounts } from '../../store/actions/IntersectionStoreActions';
import { navigateTo } from '../../store/actions/RenderStoreActions';
import { SnowmanDispatch } from '../../store/messages';
import { ViewIDs } from '../../types/ViewIDs';
import DashboardPageView from './DashboardPage.View';
import { DashboardPageDispatchProps } from './DashboardPageProps';

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
