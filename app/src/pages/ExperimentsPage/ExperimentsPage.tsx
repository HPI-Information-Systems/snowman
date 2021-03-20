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
  dragExperiment,
  getExperiments,
} from 'store/actions/ExperimentsStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): ExperimentsPageStateProps => ({
  matchingSolutions: state.AlgorithmsStore.algorithms,
  selectedMatchingSolutions: state.ExperimentsStore.selectedMatchingSolutions,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): ExperimentsPageDispatchProps => ({
  clickOnMatchingSolution(aMatchingSolution: Algorithm): void {
    dispatch(clickOnMatchingSolution(aMatchingSolution));
  },
  dragExperiment(dragResult: DropResult): void {
    dispatch(dragExperiment(dragResult));
  },
  loadExperiments(): void {
    dispatch(getExperiments()).then();
  },
});

const ExperimentsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentsPageView);

export default ExperimentsPage;
