import { IonCard, IonText } from '@ionic/react';
import { Algorithm } from 'api';
import styles from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategyStyles.module.css';
import { DecisionSegments } from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/utils/DemoData';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import React from 'react';

const MatchingSolutions: Algorithm[] = [];

const DecisionMatrixStrategyView = (): JSX.Element => (
  <>
    <ErroneousBackdrop
      shouldShow={false}
      message={
        'Please select at least a single matching solution and, optionally, an experiment each.'
      }
    />
    <IonCard>
      <table className={styles.materialTable}>
        <thead>
          <tr>
            <th>Categories</th>
            {MatchingSolutions.map(
              (anAlgorithm): JSX.Element => (
                <th key={`matrix-header-${anAlgorithm.id}`}>
                  {anAlgorithm.name}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {DecisionSegments.map(
            (aSegment): JSX.Element => (
              <>
                <tr>
                  <td>
                    <IonText color="primarydark">{aSegment.title}</IonText>
                  </td>
                </tr>
                {aSegment.children.map(
                  (anEntity): JSX.Element => (
                    <tr key={`matrix-row-initial-${anEntity.title}`}>
                      <td>
                        <b>{anEntity.title}</b>
                      </td>
                      {MatchingSolutions.map(
                        (anAlgorithm): JSX.Element => (
                          <td
                            key={`matrix-row-initial-${anEntity.title}-${anAlgorithm.id}`}
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
              </>
            )
          )}
        </tbody>
      </table>
    </IonCard>
  </>
);

export default DecisionMatrixStrategyView;
