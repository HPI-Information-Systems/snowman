import AlgorithmCardView from 'apps/AlgorithmsApp/components/AlgorithmCard/AlgorithmCard.View';
import {
  AlgorithmCardDispatchProps,
  AlgorithmCardOwnProps,
} from 'apps/AlgorithmsApp/components/AlgorithmCard/AlgorithmCardProps';
import { doDeleteAlgorithm } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'store/messages';
import { ViewIDs } from 'types/ViewIDs';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch,
  ownProps: AlgorithmCardOwnProps
): AlgorithmCardDispatchProps => ({
  deleteAlgorithm() {
    doDeleteAlgorithm(ownProps.algorithm.id).then();
  },
  editAlgorithm() {
    doOpenDialog(ViewIDs.AlgorithmDialog, ownProps.algorithm.id);
  },
});

const AlgorithmCard = connect(null, mapDispatchToProps)(AlgorithmCardView);

export default AlgorithmCard;
