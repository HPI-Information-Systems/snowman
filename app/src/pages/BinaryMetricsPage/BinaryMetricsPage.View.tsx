import 'pages/BinaryMetricsPage/BinaryMetricsPageStyles.css';
import 'katex/dist/katex.min.css';

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonText,
} from '@ionic/react';
import { Metric } from 'api';
import DataViewer from 'components/DataViewer/DataViewer';
import PageStruct from 'components/PageStruct/PageStruct';
import PaneButtonRow from 'components/PaneButtonRow/PaneButtonRow';
import StyledCarousel from 'components/StyledCarousel/StyledCarousel';
import { informationCircle } from 'ionicons/icons';
import { renderToString } from 'katex';
import { BinaryMetricsPageProps } from 'pages/BinaryMetricsPage/BinaryMetricsPageProps';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { formatLargeNumber } from 'utils/formatLargeNumber';

export const BinaryMetricsPageView = ({
  loadMetrics,
  preloadTuplesCounts,
  metrics,
  selectedMetricsTuplesCategory,
  selectPane,
  metricsTuplesCategories,
  rowCount,
  tuplesLoader,
  confusionMatrix,
  dataViewerTitle,
}: BinaryMetricsPageProps): JSX.Element => {
  useEffect(loadMetrics, [loadMetrics]);
  useEffect(preloadTuplesCounts, [preloadTuplesCounts]);
  useEffect(() => {
    // Triggered on every component update!
    ReactTooltip.rebuild();
  });

  return (
    <PageStruct title="Binary Comparison">
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
                  <IonCard className="card-fixed">
                    <IonCardHeader className="ion-text-center">
                      <IonCardTitle
                        className="metric-number"
                        color="primary"
                        data-tip={`${value.toString()} &isin; [${range.toString()}]`}
                      >
                        {value.toPrecision(3)}
                      </IonCardTitle>
                      <IonCardSubtitle
                        className="metric-name"
                        data-tip={renderToString(formula, {
                          throwOnError: false,
                          displayMode: true,
                          output: 'html',
                        })}
                      >
                        {name}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    {infoLink !== undefined ? (
                      <IonIcon
                        className="info-icon-fixed"
                        icon={informationCircle}
                        onClick={(): void => {
                          window.open(infoLink, '_blank');
                        }}
                      />
                    ) : null}
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
          <IonChip outline={true} color="dark" disabled className="count-chip">
            Total Count: {formatLargeNumber(confusionMatrix.totalCount)}
          </IonChip>
        ) : null}
        {confusionMatrix.truePositives !== undefined ? (
          <IonChip
            outline={true}
            color="success"
            disabled
            className="count-chip"
          >
            True Positives: {formatLargeNumber(confusionMatrix.truePositives)}
          </IonChip>
        ) : null}
        {confusionMatrix.falsePositives !== undefined ? (
          <IonChip
            outline={true}
            color="danger"
            disabled
            className="count-chip"
          >
            False Positives: {formatLargeNumber(confusionMatrix.falsePositives)}
          </IonChip>
        ) : null}
        {confusionMatrix.falseNegatives !== undefined ? (
          <IonChip
            outline={true}
            color="danger"
            disabled
            className="count-chip"
          >
            False Negatives: {formatLargeNumber(confusionMatrix.falseNegatives)}
          </IonChip>
        ) : null}
        {confusionMatrix.trueNegatives !== undefined ? (
          <IonChip
            outline={true}
            color="success"
            disabled
            className="count-chip"
          >
            True Negatives: {formatLargeNumber(confusionMatrix.trueNegatives)}
          </IonChip>
        ) : null}
      </div>
      <IonCard>
        <PaneButtonRow
          paneTitles={metricsTuplesCategories}
          onSelect={selectPane}
          selectedPaneTitle={selectedMetricsTuplesCategory}
        />
        <IonCardContent className="table-housing">
          <DataViewer
            tuplesCount={rowCount}
            loadTuples={tuplesLoader}
            title={dataViewerTitle}
          />
        </IonCardContent>
      </IonCard>
    </PageStruct>
  );
};
