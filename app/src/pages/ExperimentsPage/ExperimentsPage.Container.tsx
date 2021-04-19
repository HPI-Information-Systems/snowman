import ExperimentsPageView from 'pages/ExperimentsPage/ExperimentsPage.View';
import {
  ExperimentsPageDispatchProps,
  ExperimentsPageStateProps,
} from 'pages/ExperimentsPage/ExperimentsPageProps';
import { connect } from 'react-redux';
import { getExperiments } from 'store/actions/ExperimentsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): ExperimentsPageStateProps => ({
  matchingSolutions: state.CoreStore.algorithms,
  selectedMatchingSolutions: [],
  datasets: state.CoreStore.datasets,
  selectedDatasets: [],
  currentExperiments: state.CoreStore.experiments,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): ExperimentsPageDispatchProps => ({
  loadExperiments(): void {
    dispatch(getExperiments()).then();
  },
});

const ExperimentsPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentsPageView);

export default ExperimentsPageContainer;
