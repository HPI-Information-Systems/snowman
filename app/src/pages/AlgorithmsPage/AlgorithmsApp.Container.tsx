import { Algorithm } from 'api';
import AlgorithmsAppView from 'pages/AlgorithmsPage/AlgorithmsApp.View';
import {
  AlgorithmsAppDispatchProps,
  AlgorithmsAppStateProps,
} from 'pages/AlgorithmsPage/AlgorithmsAppProps';
import { connect } from 'react-redux';
import { getAlgorithms } from 'store/actions/AlgorithmsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): AlgorithmsAppStateProps => ({
  /*algorithms: state.CoreStore.algorithms.filter(
    (anAlgorithm: Algorithm) => !HiddenMatchingSolutions.has(anAlgorithm.id)
  ),*/
  algorithms: [],
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): AlgorithmsAppDispatchProps => ({
  loadAlgorithms() {
    //dispatch(getAlgorithms()).then();
  },
});

const AlgorithmsAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlgorithmsAppView);

export default AlgorithmsAppContainer;
