import { IonCol, IonGrid, IonRow } from '@ionic/react';
import { Algorithm } from 'api';
import AddAlgorithmFab from 'components/AddFab/AddAlgorithmFab';
import AlgorithmCard from 'components/AlgorithmCard/AlgorithmCard';
import AlgorithmDialog from 'components/AlgorithmDialog/AlgorithmDialog';
import PageStruct from 'components/PageStructOLD/PageStruct';
import { AlgorithmsPageProps } from 'pages/AlgorithmsPage/AlgorithmsPageProps';
import React, { useEffect } from 'react';

const AlgorithmsPageView = ({
  algorithms,
  loadAlgorithms,
}: AlgorithmsPageProps): JSX.Element => {
  useEffect((): void => loadAlgorithms(), [loadAlgorithms]);
  return (
    <PageStruct title="Matching Solutions">
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
      <AlgorithmDialog />
    </PageStruct>
  );
};

export default AlgorithmsPageView;
