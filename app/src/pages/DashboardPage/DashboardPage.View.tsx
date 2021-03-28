import 'pages/DashboardPage/DashboardPageStyles.css';

import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
} from '@ionic/react';
import IntersectionVennDiagram from 'components/IntersectionVennDiagram/IntersectionVennDiagram';
import PageStruct from 'components/PageStruct/PageStruct';
import { DashboardPageProps } from 'pages/DashboardPage/DashboardPageProps';
import React, { useEffect } from 'react';

export default function DashboardPageView({
  loadCounts,
  gotoIntersectionPage,
  vennDiagramRendered,
  canShowMetricsPage,
  gotoMetricsPage,
}: DashboardPageProps): JSX.Element {
  useEffect(() => {
    loadCounts();
  }, [loadCounts]);
  return (
    <PageStruct title={'Dashboard'}>
      <div className="dashboard-center">
        <IonCard className="dashboard-content">
          <IntersectionVennDiagram
            onIntersect={gotoIntersectionPage}
          ></IntersectionVennDiagram>
          {vennDiagramRendered ? (
            <div style={{ paddingLeft: '0.4rem', paddingBottom: '0.4rem' }}>
              <i>
                You can click on an area in the Venn Diagram to show the
                intersection.
              </i>
            </div>
          ) : (
            ''
          )}
        </IonCard>
      </div>
      <div className="dashboard-center">
        <IonCard className="dashboard-content">
          <IonCardHeader>
            <b>Evaluation Dashboard</b>
          </IonCardHeader>
          <IonCardContent>
            <IonButton
              color="light"
              style={{ marginLeft: '0', marginRight: '0.5rem' }}
              onClick={gotoIntersectionPage}
            >
              Intersect experiments
            </IonButton>
            {canShowMetricsPage ? (
              <IonButton
                color="light"
                style={{ marginLeft: '0', marginRight: '0.5rem' }}
                onClick={gotoMetricsPage}
              >
                View Metrics
              </IonButton>
            ) : (
              ''
            )}
          </IonCardContent>
        </IonCard>
      </div>
    </PageStruct>
  );
}
