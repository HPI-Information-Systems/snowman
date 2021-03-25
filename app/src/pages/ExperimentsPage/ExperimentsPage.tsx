import { Algorithm } from 'api';
import ExperimentsPageView from 'pages/ExperimentsPage/ExperimentsPage.View';
import {
  ExperimentsPageDispatchProps,
  ExperimentsPageStateProps,
} from 'pages/ExperimentsPage/ExperimentsPageProps';
import { DropResult } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import {
  clickOnMatchingSolution,
  dragNDropAnExperiment,
  getExperiments,
} from 'store/actions/ExperimentsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

import { resetIntersection } from '../../store/actions/IntersectionStoreActions';

const mapStateToProps = (state: Store): ExperimentsPageStateProps => ({
  matchingSolutions: state.CoreStore.algorithms,
  selectedMatchingSolutions:
    state.BenchmarkConfigurationStore.selectedMatchingSolutions,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): ExperimentsPageDispatchProps => ({
  clickOnMatchingSolution(aMatchingSolution: Algorithm): void {
    dispatch(clickOnMatchingSolution(aMatchingSolution));
  },
  dragExperiment(dragResult: DropResult): void {
    dispatch(dragNDropAnExperiment(dragResult));
  },
  loadExperiments(): void {
    dispatch(getExperiments()).then();
  },
  resetIntersection() {
    dispatch(resetIntersection());
  },
});

const ExperimentsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentsPageView);

export default ExperimentsPage;
