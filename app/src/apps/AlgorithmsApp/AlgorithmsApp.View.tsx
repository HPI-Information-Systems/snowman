import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Algorithm } from 'api';
import { AlgorithmsAppProps } from 'apps/AlgorithmsApp/AlgorithmsAppProps';
import AlgorithmCard from 'apps/AlgorithmsApp/components/AlgorithmCard/AlgorithmCard';
import AddFab from 'components/AddFab/AddFab';
import React from 'react';

const AlgorithmsAppView = ({
  algorithms,
  addAlgorithm,
}: AlgorithmsAppProps): JSX.Element => (
  <>
    <IonGrid>
      <IonRow>
        {algorithms.map((anAlgorithm: Algorithm) => (
          <IonCol key={'col-' + anAlgorithm.id} size="4" sizeXl="3">
            <AlgorithmCard key={anAlgorithm.id} algorithm={anAlgorithm} />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
    <AddFab clickOnFab={addAlgorithm} />
  </>
);

export default AlgorithmsAppView;
