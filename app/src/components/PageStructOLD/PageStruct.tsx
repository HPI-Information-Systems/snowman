import PageStructView from 'components/PageStructOLD/PageStruct.View';
import { PageStructStateProps } from 'components/PageStructOLD/PageStructProps';
import { connect } from 'react-redux';

const mapStateToProps = (): PageStructStateProps => ({
  showIndicator: true,
});

const PageStruct = connect(mapStateToProps)(PageStructView);

export default PageStruct;
