import { Dataset } from 'api';
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
import { fileTrayFull } from 'ionicons/icons';
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
    selectedEntities: state.resources.datasets.filter(
      (aDataset: Dataset): boolean => selectedIds.has(aDataset.id)
    ),
    entities: state.resources.datasets,
    icon: fileTrayFull,
  };
};

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: AtomicSelectorGroupOwnProps
): AtomicSelectorGroupDispatchProps => ({
  updateSelection: (datasetIds) =>
    dispatch(
      updateSelection('datasets', {
        aCacheKey: ownProps.cacheKey,
        newSelection: datasetIds,
        allowMultiple: ownProps.allowMultiple,
      })
    ),
});

const DatasetSelectorGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(AtomicSelectorGroupView);

export default DatasetSelectorGroup;
