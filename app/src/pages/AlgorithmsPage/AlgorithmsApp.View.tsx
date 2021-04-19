import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Algorithm } from 'api';
import AddAlgorithmFab from 'components/AddFab/AddAlgorithmFab';
import AlgorithmCard from 'components/AlgorithmCard/AlgorithmCard';
import AlgorithmDialog from 'components/AlgorithmDialog/AlgorithmDialog';
import { AlgorithmsAppProps } from 'pages/AlgorithmsPage/AlgorithmsAppProps';
import React, { useEffect } from 'react';

const AlgorithmsAppView = ({
  algorithms,
  loadAlgorithms,
}: AlgorithmsAppProps): JSX.Element => {
  useEffect((): void => loadAlgorithms(), [loadAlgorithms]);
  return (
    <>
      <h1>Hello.</h1>
      <IonGrid>
        <IonRow>
          {algorithms.map((anAlgorithm: Algorithm) => (
            <IonCol key={'col-' + anAlgorithm.id} size="4" sizeXl="3">
              <AlgorithmCard key={anAlgorithm.id} algorithm={anAlgorithm} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </>
  );
};

export default AlgorithmsAppView;
