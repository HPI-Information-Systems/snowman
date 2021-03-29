import { Experiment } from 'api';
import IntersectionSelectorView from 'components/IntersectionSelector/IntersectionSelector.View';
import {
  IntersectionSelectorDispatchProps,
  IntersectionSelectorStateProps,
} from 'components/IntersectionSelector/IntersectionSelectorProps';
import { connect } from 'react-redux';
import {
  excludeExperiment,
  ignoreExperiment,
  includeExperiment,
} from 'store/actions/IntersectionStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { Store } from 'store/models';

const mapStateToProps = (state: Store): IntersectionSelectorStateProps => ({
  ignored: state.IntersectionStore.ignored,
  excluded: state.IntersectionStore.excluded,
  included: state.IntersectionStore.included,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): IntersectionSelectorDispatchProps => ({
  exclude(experiment: Experiment) {
    dispatch(excludeExperiment(experiment));
  },
  include(experiment: Experiment) {
    dispatch(includeExperiment(experiment));
  },
  ignore(experiment: Experiment) {
    dispatch(ignoreExperiment(experiment));
  },
});

const IntersectionSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(IntersectionSelectorView);

export default IntersectionSelector;
