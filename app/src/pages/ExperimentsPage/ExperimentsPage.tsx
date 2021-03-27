import { Algorithm } from 'api';
import ExperimentsPageView from 'pages/ExperimentsPage/ExperimentsPage.View';
import {
  ExperimentsPageDispatchProps,
  ExperimentsPageStateProps,
} from 'pages/ExperimentsPage/ExperimentsPageProps';
import { DropResult } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import {
  clickOnExperimentsFilterTool,
  clickOnMatchingSolution,
  dragNDropAnExperiment,
  getExperiments,
} from 'store/actions/ExperimentsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): ExperimentsPageStateProps => ({
  matchingSolutions: state.CoreStore.algorithms,
  selectedMatchingSolutions:
    state.BenchmarkConfigurationStore.selectedMatchingSolutions,
  showExperimentFilters:
    state.BenchmarkConfigurationStore.showExperimentFilters,
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
  clickOnExperimentFilterTool(): void {
    dispatch(clickOnExperimentsFilterTool());
  },
});

const ExperimentsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentsPageView);

export default ExperimentsPage;
