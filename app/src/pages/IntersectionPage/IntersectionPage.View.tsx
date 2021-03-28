import 'pages/IntersectionPage/IntersectionPageStyles.css';

import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';
import DataViewer from 'components/DataViewer/DataViewer';
import IntersectionSelector from 'components/IntersectionSelector/IntersectionSelector';
import { IntersectionVennDiagramConfigStrategy } from 'components/IntersectionVennDiagram/config';
import IntersectionVennDiagram from 'components/IntersectionVennDiagram/IntersectionVennDiagram';
import { IntersectionVennDiagramIntersectionStrategy } from 'components/IntersectionVennDiagram/strategies/intersection';
import PageStruct from 'components/PageStruct/PageStruct';
import { IntersectionPageProps } from 'pages/IntersectionPage/IntersectionPageProps';
import React, { useEffect, useState } from 'react';
import { intersectionDescription } from 'utils/intersectionDescription';

const IntersectionPageView = ({
  loadTuples,
  tuplesCount,
  pairCount,
  included,
  excluded,
  loadCounts,
}: IntersectionPageProps): JSX.Element => {
  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  const [
    strategy,
    setStrategy,
  ] = useState<IntersectionVennDiagramConfigStrategy>(
    new IntersectionVennDiagramIntersectionStrategy(included, excluded)
  );
  useEffect(() => {
    setStrategy(
      new IntersectionVennDiagramIntersectionStrategy(included, excluded)
    );
  }, [included, excluded]);

  return (
    <PageStruct title={'Intersection'}>
      <IonGrid>
        <IonRow>
          <IonCol class="col-no-padding" size="12" sizeXl="6">
            <IonRow>
              <IonCol class="col-no-padding">
                <IonCard>
                  <IntersectionVennDiagram strategy={strategy} />
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol class="col-no-padding">
                <IntersectionSelector />
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol class="col-no-padding" size="12" sizeXl="6">
            <IonCard class="dataviewer-card-full">
              <IonCardHeader>
                <b>
                  {intersectionDescription({
                    excluded: excluded.map(({ name }) => name),
                    included: included.map(({ name }) => name),
                    pairCount,
                  })}
                </b>
              </IonCardHeader>
              <IonCardContent
                style={{
                  height: '72vh',
                }}
              >
                <DataViewer loadTuples={loadTuples} tuplesCount={tuplesCount} />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageStruct>
  );
};

export default IntersectionPageView;
