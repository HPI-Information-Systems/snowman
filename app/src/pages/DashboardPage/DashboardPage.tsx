import { MAX_VENN_DIAGRAM_DIMENSION } from 'components/VennDiagram/limits';
import DashboardPageView from 'pages/DashboardPage/DashboardPage.View';
import {
  DashboardPageDispatchProps,
  DashboardPageStateProps,
} from 'pages/DashboardPage/DashboardPageProps';
import { connect } from 'react-redux';
import { loadCounts } from 'store/actions/IntersectionStoreActions';
import { navigateTo } from 'store/actions/RenderStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { ViewIDs } from 'types/ViewIDs';
import { couldEnterNMetricsPage } from 'utils/accessGuards';

const mapStateToProps = (state: Store): DashboardPageStateProps => ({
  vennDiagramRendered:
    state.BenchmarkConfigurationStore.chosenExperiments.length +
      state.BenchmarkConfigurationStore.chosenGoldStandards.length <=
    MAX_VENN_DIAGRAM_DIMENSION,
  canShowMetricsPage: couldEnterNMetricsPage(state),
});

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
    gotoMetricsPage() {
      dispatch(navigateTo(ViewIDs.N_METRICS));
    },
  };
};

const DashboardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPageView);

export default DashboardPage;
