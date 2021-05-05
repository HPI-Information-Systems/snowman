import { Dataset } from 'api';
import DatasetSelectorGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroup.View';
import {
  DatasetSelectorGroupDispatchProps,
  DatasetSelectorGroupOwnProps,
  DatasetSelectorGroupStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroupProps';
import { updateDatasetSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreDatasetActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { getMultiSelectorItems } from 'apps/BenchmarkApp/utils/getMultiSelectorItems';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: DatasetSelectorGroupOwnProps
): DatasetSelectorGroupStateProps => {
  const selectedIds = new Set(
    ownProps.allowMultiple
      ? getMultiSelectorItems(
          ownProps.getCacheKey,
          state.config.multiSelects,
          state.config.datasets
        ).map((dataset) => dataset?.datasetId)
      : [state.config.datasets[ownProps.getCacheKey()]?.datasetId]
  );
  return {
    selectedDatasets: state.resources.datasets.filter(
      (aDataset: Dataset): boolean => selectedIds.has(aDataset.id)
    ),
    datasets: state.resources.datasets,
  };
};
const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: DatasetSelectorGroupOwnProps
): DatasetSelectorGroupDispatchProps => ({
  updateSelection: (datasetIds) =>
    dispatch(
      updateDatasetSelection(
        ownProps.getCacheKey,
        datasetIds,
        ownProps.allowMultiple
      )
    ),
});

const DatasetSelectorGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetSelectorGroupView);

export default DatasetSelectorGroup;
