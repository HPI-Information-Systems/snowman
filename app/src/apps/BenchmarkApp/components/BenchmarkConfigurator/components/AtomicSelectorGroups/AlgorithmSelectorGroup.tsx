import { Algorithm } from 'api';
import AtomicSelectorGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroup.View';
import {
  AtomicSelectorGroupDispatchProps,
  AtomicSelectorGroupOwnProps,
  AtomicSelectorGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/AtomicSelectorGroups/AtomicSelectorGroupProps';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import {
  getItems,
  getSingleItem,
} from 'apps/BenchmarkApp/utils/configurationItemGetter';
import { hardwareChip } from 'ionicons/icons';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';
const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupStateProps => {
  const selectedIds = new Set(
    ownProps.allowMultiple
      ? getItems(ownProps.cacheKey, state)
      : [getSingleItem(ownProps.cacheKey, state)]
  );
  return {
    selectedEntities: state.resources.algorithms.filter(
      (anAlgorithm: Algorithm): boolean => selectedIds.has(anAlgorithm.id)
    ),
    entities: state.resources.algorithms,
    icon: hardwareChip,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupDispatchProps => ({
  updateSelection: (algorithmIds) =>
    dispatch(
      updateSelection('algorithms', {
        aCacheKey: ownProps.cacheKey,
        newSelection: algorithmIds,
        allowMultiple: ownProps.allowMultiple,
      })
    ),
});

const AlgorithmSelectorGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AtomicSelectorGroupView);

export default AlgorithmSelectorGroup;
