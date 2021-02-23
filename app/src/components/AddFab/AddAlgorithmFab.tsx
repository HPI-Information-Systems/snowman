import AddFabView from 'components/AddFab/AddFab.View';
import { AddFabDispatchProps } from 'components/AddFab/AddFabProps';
import { connect } from 'react-redux';
import { openDialog } from 'store/actions/AddAlgorithmDialogStoreActions';
import { SnowmanDispatch } from 'store/messages';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): AddFabDispatchProps => ({
  clickOnFab: (): void => dispatch(openDialog()),
});

const AddAlgorithmFab = connect(null, mapDispatchToProps)(AddFabView);

export default AddAlgorithmFab;
