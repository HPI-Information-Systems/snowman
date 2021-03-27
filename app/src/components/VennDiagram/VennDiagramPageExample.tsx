import { IonCard, IonCardContent } from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import { VennFourSetsPayloadExample } from 'components/VennDiagram/venn/types/fourSetsTypes';
import { VennOneSetPayloadExample } from 'components/VennDiagram/venn/types/oneSetTypes';
import { VennThreeSetsPayloadExample } from 'components/VennDiagram/venn/types/threeSetsTypes';
import { VennTwoSetsPayloadExample } from 'components/VennDiagram/venn/types/twoSetsTypes';
import { VennDiagram } from 'components/VennDiagram/VennDiagram';
import React, { useEffect, useState } from 'react';

import { VennDiagramConfig } from './VennDiagramProps';

const VennDiagramPageExample = (): JSX.Element => {
  const [config, setConfig] = useState<VennDiagramConfig>(
    VennOneSetPayloadExample
  );
  useEffect(() => {
    const id = window.setInterval(() => {
      setConfig((lastConfig) => {
        switch (lastConfig) {
          case VennOneSetPayloadExample:
            return VennTwoSetsPayloadExample;
          case VennTwoSetsPayloadExample:
            return VennThreeSetsPayloadExample;
          case VennThreeSetsPayloadExample:
            return VennFourSetsPayloadExample;
          default:
            return VennOneSetPayloadExample;
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
