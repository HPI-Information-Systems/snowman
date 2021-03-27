import 'pages/IntersectionPage/IntersectionPage.Styles.scss';

import { IonCard, IonCardContent, IonCardHeader } from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import React, { useEffect } from 'react';

import DataViewer from '../../components/DataViewer/DataViewer';
import IntersectionSelector from '../../components/IntersectionSelector/IntersectionSelector';
import IntersectionVennDiagram from '../../components/IntersectionVennDiagram/IntersectionVennDiagram';
import { intersectionDescription } from '../../utils/intersectionDescription';
import { IntersectionPageProps } from './IntersectionPageProps';

const IntersectionPageView = ({
  loadTuples,
  tuplesCount,
  loadCounts,
  excludedExperimentNames,
  includedExperimentNames,
  pairCount,
  countsLoaded,
}: IntersectionPageProps): JSX.Element => {
  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  return (
    <PageStruct title={'N Metrics Viewer'}>
      <div className="container">
        <div className="splitter">
          <IonCard>
            {countsLoaded ? (
              <IntersectionVennDiagram></IntersectionVennDiagram>
            ) : (
              ''
            )}
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
            <b>
              {intersectionDescription({
                excluded: excludedExperimentNames,
                included: includedExperimentNames,
                pairCount,
              })}
            </b>
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
