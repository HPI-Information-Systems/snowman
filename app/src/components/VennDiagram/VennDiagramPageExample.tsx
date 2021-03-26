import { IonCard, IonCardContent } from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import { VennFourSetsPayloadExample } from 'components/VennDiagram/venn/types/fourSetsTypes';
import { VennThreeSetsPayloadExample } from 'components/VennDiagram/venn/types/threeSetsTypes';
import { VennTwoSetsPayloadExample } from 'components/VennDiagram/venn/types/twoSetsTypes';
import { VennDiagram } from 'components/VennDiagram/VennDiagram';
import { VennDiagramFlavors } from 'components/VennDiagram/VennDiagramProps';
import React from 'react';

const VennDiagramPageExample = (): JSX.Element => {
  return (
    <PageStruct title="Venn Diagram Example" showNextFab={false}>
      <IonCard>
        <IonCardContent>
          <VennDiagram
            flavor={VennDiagramFlavors.FourSets}
            payload={VennFourSetsPayloadExample}
          />
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          <VennDiagram
            flavor={VennDiagramFlavors.ThreeSets}
            payload={VennThreeSetsPayloadExample}
          />
        </IonCardContent>
      </IonCard>
      <IonCard>
        <IonCardContent>
          <VennDiagram
            flavor={VennDiagramFlavors.TwoSets}
            payload={VennTwoSetsPayloadExample}
          />
        </IonCardContent>
      </IonCard>
    </PageStruct>
  );
};

export default VennDiagramPageExample;
