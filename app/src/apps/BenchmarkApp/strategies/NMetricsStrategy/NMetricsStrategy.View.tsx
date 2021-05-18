import { IonCard, IonText } from '@ionic/react';
import { Metric } from 'api';
import { NMetricsStrategyProps } from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategyProps';
import styles from 'apps/BenchmarkApp/strategies/NMetricsStrategy/NMetricsStrategyStyles.module.css';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import {
  experimentEntityToExperimentConfigItem,
  uniqueExperimentEntityKey,
} from 'apps/BenchmarkApp/utils/experimentEntity';
import PageStruct from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStruct';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import ExperimentConfigItem from 'components/simple/ExperimentConfigItem/ExperimentConfigItem';
import { renderToString } from 'katex';
import React from 'react';
import useTooltip from 'utils/useTooltipHook';

const NMetricsStrategyView = ({
  metrics,
  experiments,
  inspectExperiment,
  isValidConfig,
}: NMetricsStrategyProps): JSX.Element => {
  useTooltip();

  return (
    <PageStruct
      pageTitle={StrategyIDs.NaryMetrics}
      enableScroll={isValidConfig}
    >
      <ErroneousBackdrop
        shouldShow={!isValidConfig}
        message={
          'Please select one gold standard and at least one other experiment ' +
          'from a single dataset!'
        }
      />
      <IonCard>
        <table className={styles.materialTable}>
          <thead>
            <tr>
              <th style={{ paddingTop: '2rem', fontSize: '1rem' }}>
                Metric Name
              </th>
              {experiments.map(
                (anExperiment): JSX.Element => (
                  <th key={uniqueExperimentEntityKey(anExperiment)}>
                    <IonText
                      className={styles.clickableContent}
                      onClick={(): void => inspectExperiment(anExperiment)}
                      data-for="tooltip"
                      data-tip="Open BinaryMetrics Viewer for experiment."
                    >
                      <ExperimentConfigItem
                        {...experimentEntityToExperimentConfigItem(
                          anExperiment
                        )}
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
                  <td>
                    <span
                      data-for="tooltipAllowHtml"
                      data-tip={renderToString(aMetric.formula, {
                        throwOnError: false,
                        displayMode: true,
                        output: 'html',
                      })}
                    >
                      <b>{aMetric.name}</b>
                    </span>
                  </td>
                  {metrics.map(
                    (
                      metricsOfAnExperiment: Metric[],
                      experimentIndex: number
                    ): JSX.Element => (
                      <td
                        key={`${uniqueExperimentEntityKey(
                          experiments[experimentIndex]
                        )}-metric-${index}`}
                      >
                        <span
                          data-for="tooltipAllowHtml"
                          data-tip={`${
                            metricsOfAnExperiment[index]?.value?.toString() ??
                            'divide by zero'
                          } &isin; [${
                            metricsOfAnExperiment[index]?.range?.toString() ??
                            '?'
                          }]`}
                        >
                          {metricsOfAnExperiment[index]?.value?.toPrecision(
                            8
                          ) ?? 'divide by zero'}
                        </span>
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
      </IonCard>
    </PageStruct>
  );
};

export default NMetricsStrategyView;
