import { SimilarityFuncItemDispatchProps } from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFuncItemProps';
import SimilarityFunctionItemView from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFunctionItem.View';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { ViewIDs } from 'types/ViewIDs';

const mapDispatchToProps = (): SimilarityFuncItemDispatchProps => ({
  openEditFunctionBuilder() {
    doOpenDialog(ViewIDs.FunctionBuilderDialog, 2);
  },
});

const SimilarityFuncItem = connect(
  null,
  mapDispatchToProps
)(SimilarityFunctionItemView);

export default SimilarityFuncItem;
