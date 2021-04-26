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
import PageStruct from 'components/PageStructOLD/PageStruct';
import { IntersectionPageProps } from 'pages/IntersectionPage/IntersectionPageProps';
import React, { useEffect, useMemo, useState } from 'react';
import { intersectionDescription } from 'utils/intersectionDescription';

const IntersectionPageView = ({
  loadTuples,
  tuplesCount,
  pairCount,
  included,
  excluded,
  ignored,
  loadCounts,
}: IntersectionPageProps): JSX.Element => {
  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  const [
    strategy,
    setStrategy,
  ] = useState<IntersectionVennDiagramConfigStrategy>(
    new IntersectionVennDiagramIntersectionStrategy(included, excluded, ignored)
  );
  useEffect(() => {
    setStrategy(
      new IntersectionVennDiagramIntersectionStrategy(
        included,
        excluded,
        ignored
      )
    );
  }, [included, excluded, ignored]);

  const intersectionDescriptionString = useMemo(
    () =>
      intersectionDescription({
        excluded: excluded.map(({ name }) => name),
        included: included.map(({ name }) => name),
        pairCount,
      }),
    [excluded, included, pairCount]
  );

  return (
    <PageStruct title={'Intersections'}>
      <IonGrid>
        <IonRow>
          <IonCol className="col-no-padding" size="12" sizeXl="6">
            <IonRow>
              <IonCol className="col-no-padding">
                <IonCard>
                  <IntersectionVennDiagram strategy={strategy} />
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="col-no-padding">
                <IntersectionSelector />
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol className="col-no-padding" size="12" sizeXl="6">
            <IonCard style={{ height: '80vh' }}>
              <IonCardHeader>
                <b>{intersectionDescriptionString}</b>
              </IonCardHeader>
              <IonCardContent
                style={{
                  height: '72vh',
                }}
              >
                <DataViewer
                  loadTuples={loadTuples}
                  tuplesCount={tuplesCount}
                  title={intersectionDescriptionString}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageStruct>
  );
};

export default IntersectionPageView;
