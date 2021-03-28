import 'pages/NMetricsPage/NMetricsPageStyles.css';

import { IonCard } from '@ionic/react';
import IntersectionVennDiagram from 'components/IntersectionVennDiagram/IntersectionVennDiagram';
import PageStruct from 'components/PageStruct/PageStruct';
import { DashboardPageProps } from 'pages/DashboardPage/DashboardPageProps';
import React, { useEffect } from 'react';

export default function DashboardPageView({
  loadCounts,
  gotoIntersectionPage,
}: DashboardPageProps): JSX.Element {
  useEffect(() => {
    loadCounts();
  }, [loadCounts]);
  return (
    <PageStruct title={'Dashboard'}>
      <IonCard>DASHBOARD</IonCard>
      <IonCard>
        <IntersectionVennDiagram
          onIntersect={gotoIntersectionPage}
        ></IntersectionVennDiagram>
      </IonCard>
    </PageStruct>
  );
}
