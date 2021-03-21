import 'pages/RootPage/RootPageStyle.css';

import { IonCard, IonCardContent } from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import { VennDiagram } from 'components/VennDiagram/VennDiagram';
import React from 'react';

const RootPageView = (): JSX.Element => {
  return (
    <PageStruct title="Home Page" showNextFab={true}>
      <IonCard>
        <IonCardContent>
          <VennDiagram sets={['1', '2', '3', '4']} />
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          <VennDiagram sets={['1', '2', '3']} />
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          <VennDiagram sets={['1', '2']} />
        </IonCardContent>
      </IonCard>
    </PageStruct>
  );
};

export default RootPageView;
