import { Experiment } from 'api';
import ExperimentsAppView from 'apps/ExperimentsApp/ExperimentsApp.View';
import {
  ExperimentsAppDispatchProps,
  ExperimentsAppOwnProps,
  ExperimentsAppStateProps,
} from 'apps/ExperimentsApp/ExperimentsAppProps';
import {
  changeSelectedAlgorithms,
  changeSelectedDatasets,
} from 'apps/ExperimentsApp/store/ExperimentsAppAction';
import {
  ExperimentsAppDispatch,
  ExperimentsAppModel,
} from 'apps/ExperimentsApp/types/ExperimentsAppModel';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { ViewIDs } from 'types/ViewIDs';

const mapStateToProps = (
  state: ExperimentsAppModel,
  ownProps: ExperimentsAppOwnProps
): ExperimentsAppStateProps => ({
  selectedAlgorithms: state.selectedAlgorithms,
  selectedDatasets: state.selectedDatasets,
  currentExperiments: ownProps.experiments.filter(
    (anExperiment: Experiment): boolean =>
      (state.selectedAlgorithms.includes(anExperiment.algorithmId) ||
        state.selectedAlgorithms.length === 0) &&
      (state.selectedDatasets.includes(anExperiment.datasetId) ||
        state.selectedDatasets.length === 0)
  ),
});

const mapDispatchToProps = (
  dispatch: ExperimentsAppDispatch
): ExperimentsAppDispatchProps => ({
  changeSelectedDatasets(selection) {
    dispatch(changeSelectedDatasets(selection));
  },
  changeSelectedAlgorithms(selection) {
    dispatch(changeSelectedAlgorithms(selection));
  },
  addExperiment() {
    doOpenDialog(ViewIDs.ExperimentDialog);
  },
});

const ExperimentsAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentsAppView);

export default ExperimentsAppContainer;
