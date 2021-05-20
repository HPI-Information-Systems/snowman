import { PreviewDialogTypes } from 'apps/PreviewDialog/types/PreviewDialogTypes';
import {
  SimilarityFuncItemDispatchProps,
  SimilarityFuncItemOwnProps,
} from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFuncItemProps';
import SimilarityFunctionItemView from 'apps/SimilarityFuncsDialog/components/SimilarityFuncItem/SimilarityFunctionItem.View';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { doDeleteSimFunction } from 'apps/SnowmanApp/store/CentralResourcesDoActions';
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
    doDeleteSimFunction(ownProps.similarityFunction.id).then();
  },
  previewSimilarityFunction() {
    doOpenDialog(
      ViewIDs.PreviewDialog,
      ownProps.similarityFunction.id,
      PreviewDialogTypes.SIM_FUNCTION
    );
  },
});

const SimilarityFuncItem = connect(
  null,
  mapDispatchToProps
)(SimilarityFunctionItemView);

export default SimilarityFuncItem;
