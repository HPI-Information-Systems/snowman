import DefaultAppView from 'app/App.View';
import { DefaultAppDispatchProps, DefaultAppStateProps } from 'app/AppProps';
import { connect } from 'react-redux';
import { getAlgorithms } from 'store/actions/AlgorithmsPageActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';
import { ViewMetaInformationCollection } from 'structs/viewMetaInfoCollection';

const mapStateToProps = ({
  RenderLogicStore: { currentViewID },
}: Store): DefaultAppStateProps => ({
  currentViewID,
  showSideMenu: !ViewMetaInformationCollection.find(
    ({ key }) => key === currentViewID
  )?.hideSideMenu,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): DefaultAppDispatchProps => ({
  loadInitialState() {
    dispatch(getAlgorithms()).then();
  },
});

const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(DefaultAppView);

export default DefaultApp;
