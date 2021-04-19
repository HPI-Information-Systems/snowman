import ExperimentsAppView from 'apps/ExperimentsPage/ExperimentsApp.View';
import {
  ExperimentsAppDispatchProps,
  ExperimentsAppStateProps,
} from 'apps/ExperimentsPage/ExperimentsAppProps';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): ExperimentsAppStateProps => ({
  selectedAlgorithms: [],
  selectedDatasets: [],
  currentExperiments: [],
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): ExperimentsAppDispatchProps => ({
  selectAlgorithm(id: number) {
    console.log('select algorithm id', id);
  },
  selectDataset(id: number) {
    console.log('select dataset id', id);
  },
});

const ExperimentsAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentsAppView);

export default ExperimentsAppContainer;
