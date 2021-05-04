import { Dataset } from 'api';
import { DatasetSelectorOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelector/DatasetSelectorProps';
import DatasetSelectorGroupView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroup.View';
import {
  DatasetSelectorItemDispatchProps,
  DatasetSelectorItemStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorGroup/DatasetSelectorGroupProps';
import { setDatasetId } from 'apps/BenchmarkApp/store/ConfigurationStoreActions';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: DatasetSelectorOwnProps
): DatasetSelectorItemStateProps => ({
  selectedDataset: state.resources.datasets.find(
    (aDataset: Dataset): boolean =>
      aDataset.id === state.config.datasets[ownProps.cacheKey]?.datasetId
  ),
  datasets: state.resources.datasets,
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<BenchmarkAppModel>,
  ownProps: DatasetSelectorOwnProps
): DatasetSelectorItemDispatchProps => ({
  setDatasetId: (datasetId) =>
    dispatch(setDatasetId(ownProps.cacheKey, datasetId)),
});

const DatasetSelectorGroup = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetSelectorGroupView);

export default DatasetSelectorGroup;
