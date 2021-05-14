import { IonCard } from '@ionic/react';
import styles from 'apps/BenchmarkApp/strategies/DecisionMatrixStrategy/DecisionMatrixStrategyStyles.module.css';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import React from 'react';

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
            <th>Spalte 1</th>
            <th>Spalte 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Spalte 1</td>
            <td>Spalte 2</td>
          </tr>
        </tbody>
      </table>
    </IonCard>
  </>
);

export default DecisionMatrixStrategyView;
