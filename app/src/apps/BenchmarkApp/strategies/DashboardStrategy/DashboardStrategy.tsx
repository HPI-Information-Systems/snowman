import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
} from '@ionic/react';
import GenericBenchmarkStrategy from 'apps/BenchmarkApp/components/GenericBenchmarkStrategy/GenericBenchmarkStrategy';
import { DashboardStrategyProps } from 'apps/BenchmarkApp/strategies/DashboardStrategy/DashboardStrategyProps';
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import PageStruct from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStruct';
import {
  analytics,
  apps,
  barChart,
  calculator,
  colorFilter,
  pauseCircle,
} from 'ionicons/icons';
import React from 'react';
import { dummyStoreFactory } from 'utils/storeFactory';

const DashboardStrategy = ({
  openStrategy,
}: DashboardStrategyProps): JSX.Element => (
  <GenericBenchmarkStrategy
    strategyId={StrategyIDs.Dashboard}
    createStrategyStore={dummyStoreFactory()}
  >
    <PageStruct pageTitle={StrategyIDs.Dashboard} enableScroll={true}>
      <IonText color="primary">
        <h3>Data Stewards</h3>
      </IonText>
      <IonGrid>
        <IonRow>
          <IonCol size="4" sizeXl="3">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  KPI Investigator
                  <span>
                    <IonIcon
                      className="ion-float-right"
                      icon={barChart}
                      size="large"
                      color="primarydark"
                    />
                  </span>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  Investigate soft and hard KPIs of experiments grouped by
                  either dataset or matching solution. Evaluation occurs with
                  the help of a variety of diagrams.
                </p>
              </IonCardContent>
              <IonCardContent>
                <IonText color="dark">
                  <p>
                    <b>Requires:</b> multiple experiments from any dataset
                  </p>
                </IonText>
              </IonCardContent>
              <IonButton
                expand="full"
                fill="clear"
                onClick={(): void => openStrategy(StrategyIDs.KpiInvestigator)}
              >
                Start Benchmark
              </IonButton>
            </IonCard>
          </IonCol>
          <IonCol size="4" sizeXl="3">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  KPI Decision Matrix
                  <span>
                    <IonIcon
                      className="ion-float-right"
                      icon={apps}
                      size="large"
                      color="primarydark"
                    />
                  </span>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  Compare matching solutions based upon their KPIs. The
                  comparison will include soft KPIs as specified as well as
                  average binary metrics.
                </p>
              </IonCardContent>
              <IonCardContent>
                <IonText color="dark">
                  <p>
                    <b>Requires:</b> at least a single matching solution
                  </p>
                </IonText>
              </IonCardContent>
              <IonButton
                expand="full"
                fill="clear"
                onClick={(): void =>
                  openStrategy(StrategyIDs.KpiDecisionMatrix)
                }
              >
                Start Benchmark
              </IonButton>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonText color="primary">
        <h3>Developers</h3>
      </IonText>
      <IonGrid>
        <IonRow>
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
                      color="primarydark"
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
                <IonText color="dark">
                  <p>
                    <b>Requires:</b> exactly two experiments from the same
                    dataset
                  </p>
                </IonText>
              </IonCardContent>
              <IonButton
                expand="full"
                fill="clear"
                onClick={(): void => openStrategy(StrategyIDs.BinaryMetrics)}
              >
                Start Benchmark
              </IonButton>
            </IonCard>
          </IonCol>
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
                      color="primarydark"
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
                <IonText color="dark">
                  <p>
                    <b>Requires:</b> at least two experiments from the same
                    dataset
                  </p>
                </IonText>
              </IonCardContent>
              <IonButton
                expand="full"
                fill="clear"
                onClick={(): void => openStrategy(StrategyIDs.NaryIntersection)}
              >
                Start Benchmark
              </IonButton>
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
                      color="primarydark"
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
                <IonText color="dark">
                  <p>
                    <b>Requires:</b> at least two experiments from the same
                    dataset
                  </p>
                </IonText>
              </IonCardContent>
              <IonButton
                expand="full"
                fill="clear"
                onClick={(): void => openStrategy(StrategyIDs.NaryMetrics)}
              >
                Start Benchmark
              </IonButton>
            </IonCard>
          </IonCol>
          <IonCol size="4" sizeXl="3">
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  Similarity Diagrams
                  <span>
                    <IonIcon
                      className="ion-float-right"
                      icon={analytics}
                      size="large"
                      color="primarydark"
                    />
                  </span>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>
                  Discover changes in metrics with changing similarity to find
                  the best threshold.
                </p>
              </IonCardContent>
              <IonCardContent>
                <IonText color="dark">
                  <p>
                    <b>Requires:</b> a single experiment with similarity values
                    (or function)
                  </p>
                </IonText>
              </IonCardContent>
              <IonButton
                expand="full"
                fill="clear"
                onClick={(): void =>
                  openStrategy(StrategyIDs.SimilarityDiagram)
                }
              >
                Start Benchmark
              </IonButton>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageStruct>
  </GenericBenchmarkStrategy>
);

export default DashboardStrategy;
