import {
  IonCard,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import IntersectionVennDiagram from 'components/IntersectionVennDiagram/IntersectionVennDiagram';
import PageStruct from 'components/PageStruct/PageStruct';
import {
  calculatorOutline,
  chevronForwardOutline,
  colorFilterOutline,
  pauseOutline,
} from 'ionicons/icons';
import { DashboardPageProps } from 'pages/DashboardPage/DashboardPageProps';
import React, { useEffect } from 'react';

export default function DashboardPageView({
  loadCounts,
  isVennDiagramRendered,
  isBinaryMetricsDisabled,
  isNMetricsDisabled,
  openNMetricsPage,
  openIntersectionPage,
  openBinaryMetricsPage,
}: DashboardPageProps): JSX.Element {
  useEffect(() => {
    loadCounts();
  }, [loadCounts]);
  return (
    <PageStruct title={'Dashboard'}>
      <IonGrid>
        <IonRow>
          <IonCol size="12" sizeLg="8">
            <IonCard className="dashboard-content">
              <IntersectionVennDiagram onIntersect={openIntersectionPage} />
              {isVennDiagramRendered ? (
                <div
                  style={{
                    paddingLeft: '0.4rem',
                    paddingBottom: '0.4rem',
                    textAlign: 'center',
                  }}
                >
                  <i>
                    You can click on an area in the Venn Diagram to directly
                    start browsing an intersection.
                  </i>
                </div>
              ) : (
                ''
              )}
            </IonCard>
          </IonCol>
          <IonCol size="12" sizeLg="4">
            <IonCard>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Evaluation Actions</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonItem
                button
                disabled={isBinaryMetricsDisabled}
                onClick={openBinaryMetricsPage}
              >
                <IonIcon icon={pauseOutline} slot="start" />
                <IonLabel>
                  <h2>Binary comparison (two only)</h2>
                  <p className="ion-text-wrap">
                    Evaluate a single experiment run against a gold standard in
                    a traditional binary comparison.
                  </p>
                </IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>
              <IonItem button onClick={openIntersectionPage}>
                <IonIcon icon={colorFilterOutline} slot="start" />
                <IonLabel>
                  <h2>Visually compare intersections</h2>
                  <p className="ion-text-wrap">
                    Use a visual representation to investigate which pairs were
                    detected as duplicates within each experiment. Selecting one
                    experiment as a gold standard is optional.
                  </p>
                </IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>
              <IonItem
                button
                disabled={isNMetricsDisabled}
                onClick={openNMetricsPage}
              >
                <IonIcon icon={calculatorOutline} slot="start" />
                <IonLabel>
                  <h2>Compare binary metrics for all</h2>
                  <p className="ion-text-wrap">
                    Select multiple experiments and a single gold standard.
                    You&apos;ll be able to compare all experiments&apos; metrics
                    against each other in a table.
                  </p>
                </IonLabel>
                <IonIcon icon={chevronForwardOutline} slot="end" />
              </IonItem>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageStruct>
  );
}
