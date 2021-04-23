import 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategyStyles.css';

import { IonCard, IonIcon, IonText } from '@ionic/react';
import { Experiment, Metric } from 'api';
import { NMetricsStrategyProps } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategyProps';
import { chevronForwardOutline } from 'ionicons/icons';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

const NMetricsStrategyView = ({
  metrics,
  experiments,
  loadMetrics,
  inspectExperiment,
}: NMetricsStrategyProps): JSX.Element => {
  useEffect(() => {
    // Triggered on every component update!
    ReactTooltip.rebuild();
  });
  useEffect(loadMetrics, [loadMetrics]);
  return (
    <IonCard>
      <table className="material-table">
        <thead>
          <tr>
            <th>Metric Name</th>
            {experiments.map(
              (anExperiment: Experiment): JSX.Element => (
                <th key={anExperiment.id}>
                  <IonText
                    color="primary"
                    className="clickable-content"
                    onClick={(): void => inspectExperiment(anExperiment)}
                    data-tip="Open BinaryMetrics Viewer for experiment."
                  >
                    {anExperiment.name}
                    <IonIcon
                      icon={chevronForwardOutline}
                      className="icon-middle-padded"
                    />
                  </IonText>
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {(metrics[0] ?? []).map(
            (aMetric: Metric, index: number): JSX.Element => (
              <tr key={'nmetrics-row-' + aMetric.name}>
                <td>{aMetric.name}</td>
                {metrics.map(
                  (
                    metricsOfAnExperiment: Metric[],
                    experimentIndex: number
                  ): JSX.Element => (
                    <td
                      key={`${experiments[experimentIndex].id}-metric-${index}`}
                    >
                      {metricsOfAnExperiment[index]?.value.toPrecision(8) ??
                        'unknown'}
                    </td>
                  )
                )}
              </tr>
            )
          )}
        </tbody>
      </table>
    </IonCard>
  );
};

export default NMetricsStrategyView;
