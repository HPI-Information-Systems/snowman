import { IonCard, IonCardContent } from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import {
  VennFourSetsPayload,
  VennFourSetsPayloadExample,
} from 'components/VennDiagram/venn/types/fourSetsTypes';
import {
  VennThreeSetsPayload,
  VennThreeSetsPayloadExample,
} from 'components/VennDiagram/venn/types/threeSetsTypes';
import {
  VennTwoSetsPayload,
  VennTwoSetsPayloadExample,
} from 'components/VennDiagram/venn/types/twoSetsTypes';
import { VennDiagram } from 'components/VennDiagram/VennDiagram';
import React, { useEffect, useState } from 'react';

const VennDiagramPageExample = (): JSX.Element => {
  const [config, setConfig] = useState<
    VennTwoSetsPayload | VennThreeSetsPayload | VennFourSetsPayload
  >(VennTwoSetsPayloadExample);
  useEffect(() => {
    const id = window.setInterval(() => {
      setConfig((lastConfig) => {
        switch (lastConfig) {
          case VennTwoSetsPayloadExample:
            return VennThreeSetsPayloadExample;
          case VennThreeSetsPayloadExample:
            return VennFourSetsPayloadExample;
          default:
            return VennTwoSetsPayloadExample;
        }
      });
    }, 5000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PageStruct title="Venn Diagram Example" showNextFab={false}>
      <IonCard>
        <IonCardContent>
          <VennDiagram config={config} />
        </IonCardContent>
      </IonCard>
    </PageStruct>
  );
};

export default VennDiagramPageExample;
