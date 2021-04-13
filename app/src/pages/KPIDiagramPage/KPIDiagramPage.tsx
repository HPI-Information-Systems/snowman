import { IonCard, IonCardContent, IonText } from '@ionic/react';
import { ScatterChart } from 'components/ChartComponent/ScatterChart';
import PageStruct from 'components/PageStruct/PageStruct';
import React from 'react';

const KPIDiagramPage = (): JSX.Element => (
  <PageStruct title="KPI Diagrams" showNextFab={true}>
    <IonText color="primary">
      <h3>Metrics over time</h3>
    </IonText>
    <IonCard>
      <IonCardContent>
        <ScatterChart
          data={{
            datasets: [
              {
                label: 'exp1',
                backgroundColor: 'cyan',
                data: [
                  { x: 3, y: 2 },
                  { x: 6, y: 3 },
                  { x: 10, y: 5 },
                  { x: 15, y: 8 },
                  { x: 18, y: 8 },
                ],
              },
              {
                label: 'exp2',
                backgroundColor: 'purple',
                data: [
                  { x: 5, y: 5 },
                  { x: 7, y: 2 },
                  { x: 9, y: 6 },
                  { x: 13, y: 9 },
                  { x: 16, y: 9 },
                ],
              },
            ],
          }}
        />
      </IonCardContent>
    </IonCard>
  </PageStruct>
);

export default KPIDiagramPage;
