import SimilarityFuncsDialogView from 'apps/SimilarityFuncsDialog/SimilarityFuncsDialog.View';
import {
  SimilarityFuncsDialogDispatchProps,
  SimilarityFuncsDialogStateProps,
} from 'apps/SimilarityFuncsDialog/SimilarityFuncsDialogProps';
import { changeSearchString } from 'apps/SimilarityFuncsDialog/store/SimilarityFuncsDialogActions';
import { SimilarityFuncsDialogModel } from 'apps/SimilarityFuncsDialog/types/SimilarityFuncsDilaogModel';
import { connect } from 'react-redux';
import { IonChangeEvent } from 'types/IonChangeEvent';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: SimilarityFuncsDialogModel
): SimilarityFuncsDialogStateProps => ({
  searchString: state.searchString,
  similarityThresholdFuncs: state.similarityFuncs,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<SimilarityFuncsDialogModel>
): SimilarityFuncsDialogDispatchProps => ({
  onChangeSearchString(event: IonChangeEvent) {
    dispatch(changeSearchString(event.detail.value ?? ''));
  },
});

const SimilarityFuncsDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimilarityFuncsDialogView);

export default SimilarityFuncsDialogContainer;
