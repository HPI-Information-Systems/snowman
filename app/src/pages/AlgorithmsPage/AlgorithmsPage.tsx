import AlgorithmsPageView from 'pages/AlgorithmsPage/AlgorithmsPage.View';
import {
  AlgorithmsDispatchProps,
  AlgorithmsPageStateProps,
} from 'pages/AlgorithmsPage/AlgorithmsPageProps';
import { connect } from 'react-redux';
import { getAlgorithms } from 'store/actions/AlgorithmsStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): AlgorithmsPageStateProps => ({
  algorithms: state.AlgorithmsStore.algorithms,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): AlgorithmsDispatchProps => ({
  loadAlgorithms() {
    dispatch(getAlgorithms()).then();
  },
});

const AlgorithmsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlgorithmsPageView);

export default AlgorithmsPage;
