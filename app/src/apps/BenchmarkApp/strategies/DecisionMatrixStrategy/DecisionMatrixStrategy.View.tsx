import { IonCard, IonText } from '@ionic/react';
import { DecisionMatrixStrategyProps } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategyProps';
import styles from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategyStyles.module.css';
import { DecisionSegments } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/utils/DemoData';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import React from 'react';

const DecisionMatrixStrategyView = ({
  isValidConfig,
  selectedAlgorithms,
}: DecisionMatrixStrategyProps): JSX.Element => (
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
        </tbody>
      </table>
    </IonCard>
  </>
);

export default DecisionMatrixStrategyView;
