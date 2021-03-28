import { Algorithm } from 'api';
import AlgorithmCardView from 'components/AlgorithmCard/AlgorithmCard.View';
import {
  AlgorithmCardDispatchProps,
  AlgorithmCardOwnProps,
  AlgorithmCardStateProps,
} from 'components/AlgorithmCard/AlgorithmCardProps';
import { connect } from 'react-redux';
import { openChangeDialog } from 'store/actions/AlgorithmDialogStoreActions';
import { deleteAlgorithm } from 'store/actions/AlgorithmsPageActions';
import { clickOnMatchingSolution } from 'store/actions/ExperimentsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (
  state: Store,
  ownProps: AlgorithmCardOwnProps
): AlgorithmCardStateProps => ({
  isSelected: state.BenchmarkConfigurationStore.selectedMatchingSolutions
    .map((aMatchingSolution: Algorithm): number => aMatchingSolution.id)
    .includes(ownProps.algorithm.id),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: AlgorithmCardOwnProps
): AlgorithmCardDispatchProps => ({
  deleteAlgorithm() {
    dispatch(deleteAlgorithm(ownProps.algorithm.id)).then();
  },
  selectAlgorithm() {
    dispatch(clickOnMatchingSolution(ownProps.algorithm));
  },
  editAlgorithm() {
    dispatch(openChangeDialog(ownProps.algorithm.id)).then();
  },
});

const AlgorithmCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlgorithmCardView);

export default AlgorithmCard;
