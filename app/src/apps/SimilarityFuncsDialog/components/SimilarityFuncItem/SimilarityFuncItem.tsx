import {
  SimilarityFuncItemDispatchProps,
  SimilarityFuncItemOwnProps,
} from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFuncItemProps';
import SimilarityFunctionItemView from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFunctionItem.View';
import { deleteSimilarityThresholdFunction } from 'apps/SimilarityFuncsDialog/store/SimilarityFuncsDialogActions';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
import { ViewIDs } from 'types/ViewIDs';

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>,
  ownProps: SimilarityFuncItemOwnProps
): SimilarityFuncItemDispatchProps => ({
  openEditFunctionBuilder() {
    doOpenDialog(ViewIDs.FunctionBuilderDialog, ownProps.similarityFunction.id);
  },
  deleteFunction() {
    dispatch(
      deleteSimilarityThresholdFunction(ownProps.similarityFunction.id)
    ).then();
  },
});

const SimilarityFuncItem = connect(
  null,
  mapDispatchToProps
)(SimilarityFunctionItemView);

export default SimilarityFuncItem;
