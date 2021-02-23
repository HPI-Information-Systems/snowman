import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Algorithm } from 'api';
import AddAlgorithmDialog from 'components/AddAlgorithmDialog/AddAlgorithmDialog';
import AddAlgorithmFab from 'components/AddFab/AddAlgorithmFab';
import AlgorithmCard from 'components/AlgorithmCard/AlgorithmCard';
import PageStruct from 'components/PageStruct/PageStruct';
import { AlgorithmsPageProps } from 'pages/AlgorithmsPage/AlgorithmsPageProps';
import React, { useEffect } from 'react';

const AlgorithmsPageView = ({
  algorithms,
  loadAlgorithms,
}: AlgorithmsPageProps): JSX.Element => {
  useEffect((): void => loadAlgorithms(), [loadAlgorithms]);
  return (
    <PageStruct title="Matching Solutions" showNextFab={false}>
      <IonGrid>
        <IonRow>
          {algorithms.map((anAlgorithm: Algorithm) => (
            <IonCol key={'col-' + anAlgorithm.id} size="4" sizeXl="3">
              <AlgorithmCard key={anAlgorithm.id} algorithm={anAlgorithm} />
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      <AddAlgorithmFab />
      <AddAlgorithmDialog />
    </PageStruct>
  );
};

export default AlgorithmsPageView;
