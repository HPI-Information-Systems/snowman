import { IonCol, IonGrid, IonNote, IonRow } from '@ionic/react';
import { BenchmarkAppModel } from 'apps/BenchmarkApp/types/BenchmarkAppModel';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import React from 'react';
import { useSelector } from 'react-redux';

const DefaultPlaceholderConfigurator = (): JSX.Element => {
  const isVisible = useSelector(
    (state: BenchmarkAppModel): boolean =>
      state.activeStrategy === StrategyIDs.Dashboard
  );
  return isVisible ? (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonNote>Please select a benchmark strategy!</IonNote>
        </IonCol>
      </IonRow>
    </IonGrid>
  ) : (
    <div />
  );
};

export default DefaultPlaceholderConfigurator;
