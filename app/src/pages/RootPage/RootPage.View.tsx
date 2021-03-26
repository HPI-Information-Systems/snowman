import 'pages/RootPage/RootPageStyle.css';

import { IonCard, IonCardContent } from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import { VennFourSetsExample } from 'components/VennDiagram/venn/types/fourSetsTypes';
import { VennThreeSetsExample } from 'components/VennDiagram/venn/types/threeSetsTypes';
import { VennTwoSetsExample } from 'components/VennDiagram/venn/types/twoSetsTypes';
import { VennDiagram } from 'components/VennDiagram/VennDiagram';
import { VennDiagramFlavors } from 'components/VennDiagram/VennDiagramProps';
import React from 'react';

const RootPageView = (): JSX.Element => {
  return (
    <PageStruct title="Home Page" showNextFab={true}>
      <IonCard>
        <IonCardContent>
          <VennDiagram
            flavor={VennDiagramFlavors.FourSets}
            sets={VennFourSetsExample}
          />
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          <VennDiagram
            flavor={VennDiagramFlavors.ThreeSets}
            sets={VennThreeSetsExample}
          />
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          <VennDiagram
            flavor={VennDiagramFlavors.TwoSets}
            sets={VennTwoSetsExample}
          />
        </IonCardContent>
      </IonCard>
    </PageStruct>
  );
};

export default RootPageView;
