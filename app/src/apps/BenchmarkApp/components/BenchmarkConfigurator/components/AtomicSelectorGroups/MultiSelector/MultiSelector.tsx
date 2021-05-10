import { StoreCacheKey } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/types';
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
    cacheKeys: getMultiSelectConfiguration(ownProps.cacheKey, state)
      .currentCacheKeys,
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
    remove(cacheKey: StoreCacheKey) {
      dispatch(remove(ownProps.cacheKey, cacheKey));
    },
  };
};

const MultiSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiSelectorView);

export default MultiSelector;
