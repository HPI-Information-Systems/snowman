import IntersectionSelectorView from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionSelector/IntersectionSelector.View';
import {
  IntersectionSelectorDispatchProps,
  IntersectionSelectorStateProps,
} from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionSelector/IntersectionSelectorProps';
import { dragNDropAnExperiment } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/store/IntersectionStrategyActions';
import { IntersectionStrategyModel } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/types/IntersectionStrategyModel';
import { DropResult } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: IntersectionStrategyModel
): IntersectionSelectorStateProps => ({
  ignored: state.ignored,
  excluded: state.excluded,
  included: state.included,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<IntersectionStrategyModel>
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
