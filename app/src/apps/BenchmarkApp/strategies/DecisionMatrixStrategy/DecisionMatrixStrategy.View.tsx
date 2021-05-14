import { IonCard, IonText } from '@ionic/react';
import { Metric } from 'api';
import { DecisionMatrixStrategyProps } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategyProps';
import styles from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategyStyles.module.css';
import { DecisionSegments } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/structs/DecisionSegments';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import { renderToString } from 'katex';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

const DecisionMatrixStrategyView = ({
  isValidConfig,
  selectedAlgorithms,
  averageMetrics,
}: DecisionMatrixStrategyProps): JSX.Element => {
  useEffect(() => {
    // Triggered on every component update!
    ReactTooltip.rebuild();
  });
  return (
    <>
      <ErroneousBackdrop
        shouldShow={!isValidConfig}
        message={
          'Please select at least a single matching solution and, optionally, an experiment each.'
        }
      />
      <IonCard>
        <table className={styles.materialTable}>
          <thead>
            <tr>
              <th>Categories</th>
              {selectedAlgorithms.map(
                (anAlgorithm): JSX.Element => (
                  <th key={`matrix-header-${anAlgorithm.id}`}>
                    <IonText color="primary">{anAlgorithm.name}</IonText>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {DecisionSegments.map(
              (aSegment, idx1): JSX.Element => (
                <React.Fragment key={`matrix-segment-${idx1}`}>
                  <tr>
                    <td colSpan={selectedAlgorithms.length + 1}>
                      <h4>
                        <IonText color="primarydark">{aSegment.title}</IonText>
                      </h4>
                    </td>
                  </tr>
                  {aSegment.children.map(
                    (anEntity, idx2): JSX.Element => (
                      <tr key={`matrix-${idx1}-row-initial-${idx2}`}>
                        <td>
                          <b
                            className={
                              anEntity.inset === true ? styles.inset : undefined
                            }
                          >
                            {anEntity.title}
                          </b>
                        </td>
                        {selectedAlgorithms.map(
                          (anAlgorithm, idx3): JSX.Element => (
                            <td
                              key={`matrix-${idx1}-row-initial-${idx2}-${idx3}`}
                            >
                              {anEntity.selector
                                ? anEntity.selector(anAlgorithm)
                                : ''}
                            </td>
                          )
                        )}
                      </tr>
                    )
                  )}
                </React.Fragment>
              )
            )}
            {averageMetrics
              .reduce(
                (prevArr, curArr): Metric[] =>
                  prevArr.length > 0 ? prevArr : curArr,
                []
              )
              .map(
                (aMetric: Metric, metricId: number): JSX.Element => (
                  <tr key={'nmetrics-row-metric-' + metricId}>
                    <td>
                      <span
                        data-tip={renderToString(aMetric.formula, {
                          throwOnError: false,
                          displayMode: true,
                          output: 'html',
                        })}
                      >
                        {aMetric.name}
                      </span>
                    </td>
                    {averageMetrics.map(
                      (
                        algorithmMetrics: Metric[],
                        index: number
                      ): JSX.Element => (
                        <td
                          key={`matrix-view-metric-${metricId}-algo-${index}`}
                        >
                          <span
                            data-tip={`${
                              algorithmMetrics[metricId]?.value?.toString() ??
                              '?'
                            } &isin; [${
                              algorithmMetrics[metricId]?.range?.toString() ??
                              '?'
                            }]`}
                          >
                            {algorithmMetrics[metricId]?.value?.toPrecision(
                              8
                            ) ?? '?'}
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
    </>
  );
};

export default DecisionMatrixStrategyView;
