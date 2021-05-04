import { Dataset } from 'api';
import { DatasetSelectorOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelector/DatasetSelectorProps';
import DatasetSelectorGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroup.View';
import {
  DatasetSelectorItemDispatchProps,
  DatasetSelectorItemStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroupProps';
import {
  setDatasetId,
  updateSelection,
} from 'apps/BenchmarkApp/store/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { getMultiSelectorItems } from 'apps/BenchmarkApp/utils/getMultiSelectorItems';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: DatasetSelectorOwnProps
): DatasetSelectorItemStateProps => {
  const selectedIds = new Set(
    getMultiSelectorItems(
      ownProps.getCacheKey,
      state.config.multiSelects,
      state.config.datasets
    ).map((dataset) => dataset?.datasetId)
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
  ownProps: DatasetSelectorOwnProps
): DatasetSelectorItemDispatchProps => ({
  updateSelection: (datasetIds) =>
    dispatch(updateSelection(ownProps.getCacheKey, setDatasetId, datasetIds)),
});

const DatasetSelectorGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetSelectorGroupView);

export default DatasetSelectorGroup;
