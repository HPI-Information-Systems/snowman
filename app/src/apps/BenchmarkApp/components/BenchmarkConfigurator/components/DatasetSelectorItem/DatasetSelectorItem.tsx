import { Dataset } from 'api';
import DatasetSelectorView from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelector/DatasetSelector.View';
import { DatasetSelectorOwnProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelector/DatasetSelectorProps';
import {
  DatasetSelectorItemDispatchProps,
  DatasetSelectorItemStateProps,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/DatasetSelectorItem/DatasetSelectorItemProps';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { ConfigurationStoreModel } from 'apps/BenchmarkApp/types/ConfigurationStoreModel';
import { connect } from 'react-redux';
import { SnowmanDispatch } from 'types/SnowmanDispatch';

const mapStateToProps = (
  state: BenchmarkAppModel,
  ownProps: DatasetSelectorOwnProps
): DatasetSelectorItemStateProps => ({
  dataset: state.resources.datasets.find(
    (aDataset: Dataset): boolean =>
      aDataset.id === state.config.datasets[ownProps.cacheKey]?.datasetId
  ),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch<ConfigurationStoreModel>
): DatasetSelectorItemDispatchProps => ({});

const DatasetSelectorItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetSelectorView);

export default DatasetSelectorItem;
