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
import { connect } from 'react-redux';
import { IonSelectChangeEvent } from 'types/IonChangeEvent';

const mapStateToProps = (
  state: ExperimentsAppModel,
  ownProps: ExperimentsAppOwnProps
): ExperimentsAppStateProps => ({
  selectedAlgorithms: state.selectedAlgorithms,
  selectedDatasets: state.selectedDatasets,
  currentExperiments: ownProps.experiments.filter(
    (anExperiment: Experiment): boolean =>
      (state.selectedAlgorithms.includes(anExperiment.algorithmId.toString()) ||
        state.selectedAlgorithms.length === 0) &&
      (state.selectedDatasets.includes(anExperiment.datasetId.toString()) ||
        state.selectedDatasets.length === 0)
  ),
});

const mapDispatchToProps = (
  dispatch: ExperimentsAppDispatch
): ExperimentsAppDispatchProps => ({
  changeSelectedDatasets(event: IonSelectChangeEvent) {
    dispatch(changeSelectedDatasets(event.detail.value));
  },
  changeSelectedAlgorithms(event: IonSelectChangeEvent) {
    dispatch(changeSelectedAlgorithms(event.detail.value));
  },
});

const ExperimentsAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentsAppView);

export default ExperimentsAppContainer;
