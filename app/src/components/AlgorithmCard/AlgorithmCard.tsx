import AlgorithmCardView from 'components/AlgorithmCard/AlgorithmCard.View';
import {
  AlgorithmCardDispatchProps,
  AlgorithmCardOwnProps,
} from 'components/AlgorithmCard/AlgorithmCardProps';
import { connect } from 'react-redux';
import { openChangeDialog } from 'store/actions/AlgorithmDialogStoreActions';
import { deleteAlgorithm } from 'store/actions/AlgorithmsStoreActions';
import { SnowmanDispatch } from 'store/messages';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: AlgorithmCardOwnProps
): AlgorithmCardDispatchProps => ({
  deleteAlgorithm() {
    dispatch(deleteAlgorithm(ownProps.algorithm.id)).then();
  },
  editAlgorithm() {
    dispatch(openChangeDialog(ownProps.algorithm.id)).then();
  },
});

const AlgorithmCard = connect(null, mapDispatchToProps)(AlgorithmCardView);

export default AlgorithmCard;
