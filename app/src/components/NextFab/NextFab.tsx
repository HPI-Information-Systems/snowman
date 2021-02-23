import NextFabView from 'components/NextFab/NextFab.View';
import {
  NextFabDispatchProps,
  NextFabStateProps,
} from 'components/NextFab/NextFabProps';
import { connect } from 'react-redux';
import { Store } from 'store/models';
import {
  couldNavigateToNextPage,
  navigateToNextPage,
} from 'utils/pathHandlers';

const mapDispatchToProps = (): NextFabDispatchProps => ({
  clickOnFab: navigateToNextPage,
});

const mapStateToProps = (aState: Store): NextFabStateProps => ({
  couldGoNext: couldNavigateToNextPage(aState),
});

const NextFab = connect(mapStateToProps, mapDispatchToProps)(NextFabView);

export default NextFab;
