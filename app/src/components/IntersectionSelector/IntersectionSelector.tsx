import IntersectionSelectorView from 'components/IntersectionSelector/IntersectionSelector.View';
import {
  IntersectionSelectorDispatchProps,
  IntersectionSelectorStateProps,
} from 'components/IntersectionSelector/IntersectionSelectorProps';
import { DropResult } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { dragNDropAnExperiment } from 'store/actions/IntersectionStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { ImmediateStore } from 'store/models';

const mapStateToProps = (
  state: ImmediateStore
): IntersectionSelectorStateProps => ({
  ignored: state.IntersectionStore.ignored,
  excluded: state.IntersectionStore.excluded,
  included: state.IntersectionStore.included,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): IntersectionSelectorDispatchProps => ({
  dragExperiment(dragResult: DropResult): void {
    dispatch(dragNDropAnExperiment(dragResult));
  },
});

const IntersectionSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntersectionSelectorView);

export default IntersectionSelector;
