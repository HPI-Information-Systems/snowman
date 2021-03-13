import {
  IonCard,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonNote,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import PageStruct from 'components/PageStruct/PageStruct';
import {
  calculatorOutline,
  chevronForwardOutline,
  colorFilterOutline,
  pauseOutline,
  reorderThreeOutline,
} from 'ionicons/icons';
import { BenchmarkConfiguratorPageProps } from 'pages/BenchmarkConfiguratorPage/BenchmarkConfiguratorPageProps';
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

const BenchmarkConfiguratorPageView = ({
  availableExperiments,
  experimentResolution,
  selectedExperiments,
  selectedGoldstandards,
  handleReorder,
  enterBinaryMetricsPage,
  couldEnterBinaryMetricsPage,
}: BenchmarkConfiguratorPageProps): JSX.Element => {
  useEffect(() => {
    // Triggered on every component update!
    ReactTooltip.rebuild();
  });

  return (
    <PageStruct title="Benchmark Configurator">
      <IonGrid>
        <IonRow>
          <IonCol sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
            <IonCard>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Experiments</IonTitle>
                </IonToolbar>
              </IonHeader>
              <IonReorderGroup
                disabled={false}
                onIonItemReorder={handleReorder}
              >
                <IonItemDivider>
                  <IonLabel>Selected Gold Standard</IonLabel>
                </IonItemDivider>

                {selectedGoldstandards.map(
                  (expId: number): JSX.Element => (
                    <IonReorder key={`bc-exp-${expId}`}>
                      <IonItem>
                        <IonIcon icon={reorderThreeOutline} slot="start" />
                        <IonLabel>{experimentResolution.get(expId)}</IonLabel>
                      </IonItem>
                    </IonReorder>
                  )
                )}

                <IonItemDivider>
                  <IonLabel>Selected Matching Result</IonLabel>
                </IonItemDivider>

                {selectedExperiments.map(
                  (expId: number): JSX.Element => (
                    <IonReorder key={`bc-exp-${expId}`}>
                      <IonItem>
                        <IonIcon icon={reorderThreeOutline} slot="start" />
                        <IonLabel>{experimentResolution.get(expId)}</IonLabel>
                      </IonItem>
                    </IonReorder>
                  )
                )}

                <IonItemDivider>
                  <IonLabel>Available Experiments</IonLabel>
                </IonItemDivider>

                {availableExperiments.map(
                  (expId: number): JSX.Element => (
                    <IonReorder key={`bc-exp-${expId}`}>
                      <IonItem>
                        <IonIcon icon={reorderThreeOutline} slot="start" />
                        <IonLabel>{experimentResolution.get(expId)}</IonLabel>
                      </IonItem>
                    </IonReorder>
                  )
                )}
              </IonReorderGroup>
            </IonCard>
          </IonCol>

          <IonCol sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
            <IonCard>
              <IonHeader>
                <IonToolbar>
                  <IonTitle>Actions</IonTitle>
                </IonToolbar>
              </IonHeader>
              {/* Todo: Simulate disabled with CSS so we can use data-tip */}
              <IonItem
                button
                onClick={() => enterBinaryMetricsPage()}
                disabled={!couldEnterBinaryMetricsPage}
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
              <IonItem
                button
                disabled={true}
                data-tip="Error: Not implemented yet!"
              >
                <IonIcon icon={colorFilterOutline} slot="start" />
                <IonLabel>
                  <h2>Visually compare all pairs</h2>
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
                disabled={true}
                data-tip="Error: Not implemented yet!"
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
        <IonRow>
          <IonCol size="12" className="ion-text-center">
            <IonNote>
              Actions may become unavailable in case too many or not enough
              experiments were selected. See the action&apos;s description for
              more details.
            </IonNote>
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageStruct>
  );
};

export default BenchmarkConfiguratorPageView;
