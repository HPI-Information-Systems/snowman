import MultiSelectorView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/MultiSelector/MultiSelector.View';
import {
  MultiSelectorDispatchProps,
  MultiSelectorOwnProps,
  MultiSelectorStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/MultiSelector/MultiSelectorProps';
import {
  getMultiSelectConfiguration,
  push,
  remove,
} from 'apps/BenchmarkApp/store/ConfigurationStore/MultiSelectorActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: MultiSelectorOwnProps
): MultiSelectorStateProps => {
  return {
    ids: getMultiSelectConfiguration(ownProps.cacheKey, state)
      .currentIds.slice()
      .sort(),
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: MultiSelectorOwnProps
): MultiSelectorDispatchProps => {
  return {
    push() {
      dispatch(push(ownProps.cacheKey));
    },
    remove(id: number) {
      dispatch(remove(ownProps.cacheKey, id));
    },
  };
};

const MultiSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiSelectorView);

export default MultiSelector;
