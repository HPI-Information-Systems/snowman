import 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/BinaryMetricsStrategyStyles.css';
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
import { BinaryMetricsStrategyProps } from 'apps/BenchmarkApp/strategies/BinaryMetricsStrategy/BinaryMetricsStrategyProps';
import DataViewer from 'components/simple/DataViewer/DataViewer';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import PaneButtonRow from 'components/simple/PaneButtonRow/PaneButtonRow';
import StyledCarousel from 'components/simple/StyledCarousel/StyledCarousel';
import { informationCircle } from 'ionicons/icons';
import { renderToString } from 'katex';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { formatLargeNumber } from 'utils/formatLargeNumber';

const BinaryMetricsStrategyView = ({
  metrics,
  selectedMetricsTuplesCategory,
  selectPane,
  metricsTuplesCategories,
  rowCount,
  tuplesLoader,
  confusionMatrix,
  dataViewerTitle,
  isValidConfig,
}: BinaryMetricsStrategyProps): JSX.Element => {
  //useEffect(loadMetrics, [loadMetrics]);
  //useEffect(preloadTuplesCounts, [preloadTuplesCounts]);
  useEffect(() => {
    // Triggered on every component update!
    ReactTooltip.rebuild();
  });

  return (
    <>
      <ErroneousBackdrop
        shouldShow={!isValidConfig}
        message={
          'Please select one gold standard and at least one other experiment ' +
          'from a single dataset!'
        }
      />
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
                        data-tip={`${
                          value?.toString() ?? 'divide by zero'
                        } &isin; [${range?.toString() ?? '?'}]`}
                      >
                        {value?.toPrecision(3) ?? 'divide by zero'}
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
    </>
  );
};

export default BinaryMetricsStrategyView;
