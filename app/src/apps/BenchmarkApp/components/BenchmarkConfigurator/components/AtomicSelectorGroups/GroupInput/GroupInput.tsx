import {
  getCacheKey,
  getCacheKeyAndFilter,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import {
  GroupArgsT,
  resolveMultiSelectorAutoIncrements,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/group';
import GroupInputView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/GroupInput/GroupInput.View';
import {
  GroupInputOwnProps,
  GroupInputStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/GroupInput/GroupInputProps';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { connect } from 'react-redux';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: GroupInputOwnProps
): GroupInputStateProps => {
  const cacheKeys = resolveMultiSelectorAutoIncrements(
    ...(ownProps.cacheKey.slice(1) as GroupArgsT)
  );
  return {
    cacheKeys: cacheKeys.map(([, cacheKey, heading]) => [cacheKey, heading]),
    items: getCacheKeyAndFilter(
      getCacheKey(StoreCacheKeyBaseEnum.group, [], ...cacheKeys)
    ).getSelectorItems(state),
  };
};

const GroupInput = connect(mapStateToProps)(GroupInputView);

export default GroupInput;
