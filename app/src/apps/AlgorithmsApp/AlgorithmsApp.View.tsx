import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import { Algorithm } from 'api';
import { AlgorithmsAppProps } from 'apps/AlgorithmsApp/AlgorithmsAppProps';
import AlgorithmCard from 'apps/AlgorithmsApp/components/AlgorithmCard/AlgorithmCard';
import AddFab from 'components/simple/GenericFab/AddFab';
import React from 'react';

const AlgorithmsAppView = ({
  algorithms,
  addAlgorithm,
}: AlgorithmsAppProps): JSX.Element => (
  <>
    <IonText color="primary">
      <h3>Matching Solutions</h3>
    </IonText>
    <IonGrid>
      <IonRow>
        {algorithms.map((anAlgorithm: Algorithm) => (
          <IonCol key={'col-' + anAlgorithm.id} size="4" sizeXl="3">
            <AlgorithmCard key={anAlgorithm.id} algorithm={anAlgorithm} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
    {algorithms.length === 0 ? (
      <IonText color="medium">No matching solutions found!</IonText>
    ) : undefined}
    <AddFab clickOnFab={addAlgorithm} />
  </>
);

export default AlgorithmsAppView;
