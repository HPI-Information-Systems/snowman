import SimilarityFuncsDialogView from 'apps/SimilarityFuncsDialog/SimilarityFuncsDialog.View';
import {
  SimilarityFuncsDialogDispatchProps,
  SimilarityFuncsDialogOwnProps,
  SimilarityFuncsDialogStateProps,
} from 'apps/SimilarityFuncsDialog/SimilarityFuncsDialogProps';
import { changeSearchString } from 'apps/SimilarityFuncsDialog/store/SimilarityFuncsDialogActions';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { doOpenDialog } from 'apps/SnowmanApp/store/RenderLogicDoActions';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: SimilarityFuncsDialogModel,
  ownProps: SimilarityFuncsDialogOwnProps
): SimilarityFuncsDialogStateProps => ({
  searchString: state.searchString,
  similarityThresholdFuncs: ownProps.centralResources.simFunctions.filter(
    (aFunction): boolean => aFunction.experimentId === ownProps.entityId
  ),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>
): SimilarityFuncsDialogDispatchProps => ({
  onChangeSearchString(event: IonChangeEvent) {
    dispatch(changeSearchString(event.detail.value ?? ''));
  },
  openAddFunctionBuilder() {
    doOpenDialog(-1);
  },
});

const SimilarityFuncsDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimilarityFuncsDialogView);

export default SimilarityFuncsDialogContainer;
