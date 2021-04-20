import AlgorithmCardView from 'apps/AlgorithmsApp/components/AlgorithmCard/AlgorithmCard.View';
import {
  AlgorithmCardDispatchProps,
  AlgorithmCardOwnProps,
} from 'apps/AlgorithmsApp/components/AlgorithmCard/AlgorithmCardProps';
import { doDeleteAlgorithm } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { connect } from 'react-redux';
import { openChangeDialog } from 'store/actions/AlgorithmDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: AlgorithmCardOwnProps
): AlgorithmCardDispatchProps => ({
  deleteAlgorithm() {
    doDeleteAlgorithm(ownProps.algorithm.id).then();
  },
  editAlgorithm() {
    dispatch(openChangeDialog(ownProps.algorithm.id)).then();
  },
});

const AlgorithmCard = connect(null, mapDispatchToProps)(AlgorithmCardView);

export default AlgorithmCard;
