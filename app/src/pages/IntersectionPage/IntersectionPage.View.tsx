import 'pages/IntersectionPage/IntersectionPage.Styles.scss';

import { IonCard } from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import React, { useEffect } from 'react';

import DataViewer from '../../components/DataViewer/DataViewer';
import IntersectionSelector from '../../components/IntersectionSelector/IntersectionSelector';
import { IntersectionPageProps } from './IntersectionPageProps';

const IntersectionPageView = ({
  loadTuples,
  tuplesCount,
  loadCounts,
}: IntersectionPageProps): JSX.Element => {
  useEffect(loadCounts, [loadCounts]);
  return (
    <PageStruct title={'N Metrics Viewer'}>
      <div className="container">
        <div className="splitter">
          <IonCard className="venn-diagramm">VENN DIAGRAM</IonCard>
          <IonCard>
            <IntersectionSelector></IntersectionSelector>
          </IonCard>
        </div>
        <div className="splitter" style={{ flexGrow: 100 }}>
          <DataViewer
            loadTuples={loadTuples}
            tuplesCount={tuplesCount}
          ></DataViewer>
        </div>
      </div>
    </PageStruct>
  );
};

export default IntersectionPageView;
