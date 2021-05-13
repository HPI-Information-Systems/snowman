import AlgorithmsAppView from 'apps/AlgorithmsApp/AlgorithmsApp.View';
import { AlgorithmsAppDispatchProps } from 'apps/AlgorithmsApp/AlgorithmsAppProps';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { ViewIDs } from 'types/ViewIDs';

const mapDispatchToProps = (): AlgorithmsAppDispatchProps => ({
  addAlgorithm: () => {
    doOpenDialog(ViewIDs.AlgorithmDialog);
  },
});
const AlgorithmsAppContainer = connect(
  null,
  mapDispatchToProps
)(AlgorithmsAppView);

export default AlgorithmsAppContainer;
