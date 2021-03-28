import 'pages/NMetricsPage/NMetricsPageStyles.css';

import { IonCard } from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import React, { useEffect } from 'react';

import IntersectionVennDiagram from '../../components/IntersectionVennDiagram/IntersectionVennDiagram';
import { DashboardPageProps } from './DashboardPageProps';

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
