import { ExperimentIntersection } from 'api';
import { ColumnDescriptor } from 'components/DataViewer/ColumnDescriptor';
import { flattenDeep } from 'lodash';
import { BinaryMetricsPageView } from 'pages/BinaryMetricsPage/BinaryMetricsPage.View';
import {
  BinaryMetricsDispatchProps,
  BinaryMetricsPageStateProps,
} from 'pages/BinaryMetricsPage/BinaryMetricsPageProps';
import { connect } from 'react-redux';
import {
  clickOnPane,
  loadBinaryMetricsTuples,
  loadMetrics,
} from 'store/actions/MetricsStoreActions';
import { SnowmanDispatch } from 'store/messages';
import { MetricsStore, Store } from 'store/models';
import { MetricsTuplesCategories } from 'types/MetricsTuplesCategories';

const getTuplesByTuplesCategory = (
  store: MetricsStore,
  aMetricsTuplesCategory: MetricsTuplesCategories
): ExperimentIntersection | undefined => {
  switch (aMetricsTuplesCategory) {
    case MetricsTuplesCategories.truePositives:
      return store.truePositives;
    case MetricsTuplesCategories.falseNegatives:
      return store.falseNegatives;
    case MetricsTuplesCategories.falsePositives:
      return store.falsePositives;
  }
};

const mapStateToProps = (state: Store): BinaryMetricsDispatchProps => ({
  metrics: state.MetricsStore.metrics,
  metricsTuplesCategories: [
    MetricsTuplesCategories.falseNegatives,
    MetricsTuplesCategories.falsePositives,
    MetricsTuplesCategories.truePositives,
  ],
  selectedMetricsTuplesCategory: state.MetricsStore.selectedDataView,
  dataViewerTuples: ((): unknown[] => {
    const group = getTuplesByTuplesCategory(
      state.MetricsStore,
      state.MetricsStore.selectedDataView
    );
    if (group !== undefined) {
      return flattenDeep(
        group.data.map((aCluster: string[][]): unknown[] => [
          ...aCluster.map((aRow: string[]): unknown => {
            const rowObject: Record<string, string> = {};
            aRow.forEach((value: string, index: number): void => {
              rowObject[group.header[index]] = value;
            });
            return rowObject;
          }),
          // we insert an empty line at the end of a cluster
          {},
        ])
      );
    }
    return [];
  })(),
  dataViewerHeader: (
    getTuplesByTuplesCategory(
      state.MetricsStore,
      state.MetricsStore.selectedDataView
    )?.header ?? []
  ).map(
    (aTitle: string): ColumnDescriptor => ({
      label: aTitle,
      objKey: aTitle,
    })
  ),
});

const mapDispatchToProps = (
  dispatch: SnowmanDispatch
): BinaryMetricsPageStateProps => ({
  loadMetrics() {
    dispatch(loadMetrics()).then();
  },
  loadTuples() {
    dispatch(loadBinaryMetricsTuples()).then();
  },
  selectPane(aMetricsTuplesCategory: MetricsTuplesCategories) {
    dispatch(clickOnPane(aMetricsTuplesCategory));
  },
});

const BinaryMetricsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BinaryMetricsPageView);

export default BinaryMetricsPage;
