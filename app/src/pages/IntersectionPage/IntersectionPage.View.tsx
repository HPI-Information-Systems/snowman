import 'pages/IntersectionPage/IntersectionPage.Styles.scss';

import { IonCard, IonCardContent, IonCardHeader } from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import React, { useEffect } from 'react';

import DataViewer from '../../components/DataViewer/DataViewer';
import IntersectionSelector from '../../components/IntersectionSelector/IntersectionSelector';
import { VennTwoSetsPayloadExample } from '../../components/VennDiagram/venn/types/twoSetsTypes';
import VennDiagram from '../../components/VennDiagram/VennDiagram';
import { IntersectionPageProps } from './IntersectionPageProps';

const IntersectionPageView = ({
  loadTuples,
  tuplesCount,
  loadCounts,
  excludedExperimentNames,
  includedExperimentNames,
  pairCount,
}: IntersectionPageProps): JSX.Element => {
  useEffect(loadCounts, [loadCounts]);

  function intersectionDescription() {
    let description = '';
    if (includedExperimentNames.length > 0) {
      description += includedExperimentNames.join(' ∩ ');
    } else {
      description += 'Ω';
    }
    description += ['', ...excludedExperimentNames].join(' \\ ');
    description += ` (${pairCount} pairs)`;
    return description;
  }

  return (
    <PageStruct title={'N Metrics Viewer'}>
      <div className="container">
        <div className="splitter">
          <IonCard>
            <VennDiagram config={VennTwoSetsPayloadExample}></VennDiagram>
          </IonCard>
          <IonCard>
            <IntersectionSelector></IntersectionSelector>
          </IonCard>
        </div>
        <IonCard
          className="splitter"
          style={{
            flexGrow: 100,
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
        >
          <IonCardHeader>
            <b>{intersectionDescription()}</b>
          </IonCardHeader>
          <IonCardContent
            style={{ minHeight: '20rem', maxHeight: '90vh', flexGrow: '1' }}
          >
            <DataViewer
              loadTuples={loadTuples}
              tuplesCount={tuplesCount}
            ></DataViewer>
          </IonCardContent>
        </IonCard>
      </div>
    </PageStruct>
  );
};

export default IntersectionPageView;
