import AlgorithmCardView from 'apps/AlgorithmsApp/components/AlgorithmCard/AlgorithmCard.View';
import {
  AlgorithmCardDispatchProps,
  AlgorithmCardOwnProps,
} from 'apps/AlgorithmsApp/components/AlgorithmCard/AlgorithmCardProps';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicActions';
import { connect } from 'react-redux';
import { deleteAlgorithm } from 'store/actions/AlgorithmsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { ViewIDs } from 'types/ViewIDs';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: AlgorithmCardOwnProps
): AlgorithmCardDispatchProps => ({
  deleteAlgorithm() {
    dispatch(deleteAlgorithm(ownProps.algorithm.id)).then();
  },
  editAlgorithm() {
    doOpenDialog(ViewIDs.AlgorithmDialog, ownProps.algorithm.id);
  },
});

const AlgorithmCard = connect(null, mapDispatchToProps)(AlgorithmCardView);

export default AlgorithmCard;
