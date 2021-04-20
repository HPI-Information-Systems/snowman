import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicActions';
import AddFabView from 'components/AddFab/AddFab.View';
import { AddFabDispatchProps } from 'components/AddFab/AddFabProps';
import { connect } from 'react-redux';
import { ViewIDs } from 'types/ViewIDs';

const mapDispatchToProps = (): AddFabDispatchProps => ({
  clickOnFab: (): void => doOpenDialog(ViewIDs.AlgorithmDialog),
});

const AddAlgorithmFab = connect(null, mapDispatchToProps)(AddFabView);

export default AddAlgorithmFab;
