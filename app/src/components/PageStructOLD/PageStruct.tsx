import PageStructView from 'components/PageStructOLD/PageStruct.View';
import { PageStructStateProps } from 'components/PageStructOLD/PageStructProps';
import { connect } from 'react-redux';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): PageStructStateProps => ({
  showIndicator: state.GlobalIndicatorStore.ongoingRequestsCount > 0,
});

const PageStruct = connect(mapStateToProps)(PageStructView);

export default PageStruct;
