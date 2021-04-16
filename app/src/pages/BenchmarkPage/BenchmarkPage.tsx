import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import { barChart, calculator, colorFilter, pauseCircle } from 'ionicons/icons';
import React from 'react';

const BenchmarkPage = (): JSX.Element => {
  return (
    <PageStruct title={'Benchmark Dashboard'}>
      <IonGrid>
        <IonRow>
          <IonCol size="4" sizeXl="3">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  N-Intersection Viewer
                  <span>
                    <IonIcon
                      className="ion-float-right"
                      icon={colorFilter}
                      size="large"
                      color="primary"
                    />
                  </span>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  Use a visual representation to investigate which pairs were
                  detected as duplicates within each experiment. Selecting one
                  experiment as a gold standard is optional.
                </p>
              </IonCardContent>
              <IonCardContent>
                <p>
                  <b>Requires:</b> at least two experiments from the same
                  dataset
                </p>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="4" sizeXl="3">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  N-Metrics Table
                  <span>
                    <IonIcon
                      className="ion-float-right"
                      icon={calculator}
                      size="large"
                      color="primary"
                    />
                  </span>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  Compare multiple experiments and a single gold standard.
                  You&apos;ll be able to compare all experiments&apos; metrics
                  against each other in a table.
                </p>
              </IonCardContent>
              <IonCardContent>
                <p>
                  <b>Requires:</b> at least two experiments from the same
                  dataset
                </p>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="4" sizeXl="3">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  Binary Metrics View
                  <span>
                    <IonIcon
                      className="ion-float-right"
                      icon={pauseCircle}
                      size="large"
                      color="primary"
                    />
                  </span>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  Summary view to compare a single experiment against a ground
                  truth. You can view metrics as well as investigate tuples.
                </p>
              </IonCardContent>
              <IonCardContent>
                <p>
                  <b>Requires:</b> exactly two experiments from the same dataset
                </p>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol size="4" sizeXl="3">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  Diagram Investigator
                  <span>
                    <IonIcon
                      className="ion-float-right"
                      icon={barChart}
                      size="large"
                      color="primary"
                    />
                  </span>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  Investigate soft and hard KPIs of experiments grouped by
                  either dataset or matching solutions. Evaluation occurs with
                  the help of a variety of diagrams.
                </p>
              </IonCardContent>
              <IonCardContent>
                <p>
                  <b>Requires:</b> multiple experiments from any dataset
                </p>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageStruct>
  );
};

export default BenchmarkPage;
