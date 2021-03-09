import 'pages/BinaryMetricsPage/BinaryMetricsPageStyles.css';
import 'katex/dist/katex.min.css';

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonText,
} from '@ionic/react';
import { Metric } from 'api';
import DataViewer from 'components/DataViewer/DataViewer';
import PageStruct from 'components/PageStruct/PageStruct';
import PaneButtonRow from 'components/PaneButtonRow/PaneButtonRow';
import StyledCarousel from 'components/StyledCarousel/StyledCarousel';
import { renderToString } from 'katex';
import { BinaryMetricsPageProps } from 'pages/BinaryMetricsPage/BinaryMetricsPageProps';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

export const BinaryMetricsPageView = ({
  loadMetrics,
  preloadTuplesCounts,
  metrics,
  selectedMetricsTuplesCategory,
  selectPane,
  metricsTuplesCategories,
  tuplesCount,
  tuplesLoader,
  confusionMatrix,
}: BinaryMetricsPageProps): JSX.Element => {
  useEffect(() => loadMetrics(), [loadMetrics]);
  useEffect(() => preloadTuplesCounts(), [preloadTuplesCounts]);
  useEffect(() => {
    // Triggered on every component update!
    ReactTooltip.rebuild();
  });

  return (
    <PageStruct title="Benchmark - Binary Comparison" showNextFab={false}>
      <IonText color="primary">
        <h3 data-tip="Binary metrics are calculated based upon the count of false positives, false negatives, true negatives and true positives.">
          Binary Metrics
        </h3>
      </IonText>
      <StyledCarousel itemsToShow={5} itemsToScroll={5}>
        {metrics.length > 0
          ? metrics.map(
              ({
                name,
                formula,
                range,
                value,
                info,
                infoLink,
              }: Metric): JSX.Element => (
                <div key={name}>
                  <IonCard class="card-fixed">
                    <IonCardHeader class="ion-text-center">
                      <IonCardTitle
                        class="metric-number"
                        color="primary"
                        data-tip={`Range: [${range.toString()}]`}
                      >
                        {value !== undefined ? value.toPrecision(2) : '?'}
                      </IonCardTitle>
                      <IonCardSubtitle
                        class="metric-name"
                        data-tip={renderToString(formula, {
                          throwOnError: false,
                          displayMode: true,
                          output: 'html',
                        })}
                      >
                        {name}
                      </IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </div>
              )
            )
          : [
              <div
                key="empty-placeholder-metric"
                className="card-placeholder"
              />,
            ]}
      </StyledCarousel>
      <IonText color="primary">
        <h3>Confusion Matrix</h3>
      </IonText>
      <div>
        {confusionMatrix.totalCount !== undefined ? (
          <IonChip outline={true} color="dark">
            Total Count: {confusionMatrix.totalCount}
          </IonChip>
        ) : null}
        {confusionMatrix.trueNegatives !== undefined ? (
          <IonChip outline={true} color="success">
            True Negatives: {confusionMatrix.trueNegatives}
          </IonChip>
        ) : null}
        {confusionMatrix.falsePositives !== undefined ? (
          <IonChip outline={true} color="danger">
            False Positives: {confusionMatrix.falsePositives}
          </IonChip>
        ) : null}
        {confusionMatrix.falseNegatives !== undefined ? (
          <IonChip outline={true} color="danger">
            False Negatives: {confusionMatrix.falseNegatives}
          </IonChip>
        ) : null}
        {confusionMatrix.truePositives !== undefined ? (
          <IonChip outline={true} color="success">
            True Positives: {confusionMatrix.truePositives}
          </IonChip>
        ) : null}
      </div>
      <IonCard>
        <PaneButtonRow
          paneTitles={metricsTuplesCategories}
          onSelect={selectPane}
          selectedPaneTitle={selectedMetricsTuplesCategory}
        />
        <IonCardContent class="table-housing">
          <DataViewer tuplesCount={tuplesCount} loadTuples={tuplesLoader} />
        </IonCardContent>
      </IonCard>
    </PageStruct>
  );
};
