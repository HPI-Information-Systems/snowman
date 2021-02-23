import PageStructView from 'components/PageStruct/PageStruct.View';
import { PageStructStateProps } from 'components/PageStruct/PageStructProps';
import { connect } from 'react-redux';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): PageStructStateProps => ({
  showIndicator: state.GlobalIndicatorStore.ongoingRequestsCount > 0,
});

const PageStruct = connect(mapStateToProps)(PageStructView);

export default PageStruct;
