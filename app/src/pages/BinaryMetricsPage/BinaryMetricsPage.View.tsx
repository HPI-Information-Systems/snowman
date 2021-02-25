import 'pages/BinaryMetricsPage/BinaryMetricsPageStyles.css';

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
  loadTuples,
  metrics,
  selectedMetricsTuplesCategory,
  selectPane,
  metricsTuplesCategories,
  dataViewerHeader,
  dataViewerTuples,
}: BinaryMetricsPageProps): JSX.Element => {
  useEffect(() => loadMetrics(), [loadMetrics]);
  useEffect(() => loadTuples(), [loadTuples]);
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
        {metrics.map(
          ({ name, description, range, value }: Metric): JSX.Element => (
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
                    data-tip={renderToString(description, {
                      throwOnError: false,
                      displayMode: true,
                      output: 'mathml',
                    })}
                  >
                    {name}
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </div>
          )
        )}
      </StyledCarousel>
      <IonText color="primary">
        <h3>Example Pairs</h3>
      </IonText>
      <IonCard>
        <PaneButtonRow
          paneTitles={metricsTuplesCategories}
          onSelect={selectPane}
          selectedPaneTitle={selectedMetricsTuplesCategory}
        />
        <IonCardContent class="table-housing">
          <DataViewer
            columnHeaders={dataViewerHeader}
            tuples={dataViewerTuples}
          />
        </IonCardContent>
      </IonCard>
    </PageStruct>
  );
};
