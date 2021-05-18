import { IonCard, IonIcon, IonText } from '@ionic/react';
import { Metric } from 'api';
import { DecisionMatrixStrategyProps } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategyProps';
import styles from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategyStyles.module.css';
import { DecisionSegments } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/structs/DecisionSegments';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import PageStruct from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStruct';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import { chevronBack, chevronDown, create } from 'ionicons/icons';
import { renderToString } from 'katex';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

const DecisionMatrixStrategyView = ({
  isValidConfig,
  selectedAlgorithms,
  averageMetrics,
  editAlgorithm,
  expandedEntities,
  toggleExpansion,
}: DecisionMatrixStrategyProps): JSX.Element => {
  useEffect(() => {
    // Triggered on every component update!
    ReactTooltip.rebuild();
  });
  return (
    <PageStruct
      pageTitle={StrategyIDs.KpiDecisionMatrix}
      enableScroll={isValidConfig}
    >
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
                    <IonText
                      color="primary"
                      onClick={(): void => editAlgorithm(anAlgorithm.id)}
                      className={styles.clickableContent}
                      data-for="tooltip"
                      data-tip="Edit this matching solution's properties."
                    >
                      {anAlgorithm.name}
                      <IonIcon
                        icon={create}
                        className={styles.iconMiddlePadded}
                      />
                    </IonText>
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
                      <h4 className={styles.section}>{aSegment.title}</h4>
                    </td>
                  </tr>
                  {aSegment.children.map((anEntity, idx2): JSX.Element | null =>
                    anEntity.expandedBy === undefined ||
                    expandedEntities.includes(anEntity.expandedBy) ? (
                      <tr
                        key={`matrix-${idx1}-row-initial-${idx2}`}
                        onClick={() =>
                          anEntity.doesExpand !== undefined
                            ? toggleExpansion(anEntity.doesExpand)
                            : void 0
                        }
                      >
                        <td>
                          <b
                            className={
                              anEntity.inset === true ? styles.inset : undefined
                            }
                          >
                            {anEntity.title}
                            {anEntity.doesExpand !== undefined ? (
                              expandedEntities.includes(anEntity.doesExpand) ? (
                                <IonIcon
                                  icon={chevronDown}
                                  className={styles.iconMiddlePadded}
                                />
                              ) : (
                                <IonIcon
                                  icon={chevronBack}
                                  className={styles.iconMiddlePadded}
                                />
                              )
                            ) : null}
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
                    ) : null
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
                    {averageMetrics.map(
                      (
                        algorithmMetrics: Metric[],
                        index: number
                      ): JSX.Element => (
                        <td
                          key={`matrix-view-metric-${metricId}-algo-${index}`}
                        >
                          <span
                            data-for="tooltipAllowHtml"
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
    </PageStruct>
  );
};

export default DecisionMatrixStrategyView;
