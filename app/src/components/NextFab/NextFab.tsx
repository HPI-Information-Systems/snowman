import NextFabView from 'components/NextFab/NextFab.View';
import {
  NextFabDispatchProps,
  NextFabStateProps,
} from 'components/NextFab/NextFabProps';
import { connect } from 'react-redux';
import { navigateToNextPage } from 'store/actions/RenderStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): NextFabDispatchProps => ({
  clickOnFab: () => {
    dispatch(navigateToNextPage());
  },
});

const mapStateToProps = (aState: Store): NextFabStateProps => ({
  couldGoNext: aState.RenderLogicStore.couldGoNext,
});

const NextFab = connect(mapStateToProps, mapDispatchToProps)(NextFabView);

export default NextFab;
