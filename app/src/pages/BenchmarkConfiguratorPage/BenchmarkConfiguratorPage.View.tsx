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
import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { IonReorderEvent } from 'types/IonReorderEvent';

const BenchmarkConfiguratorPageView = (): JSX.Element => {
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
                onIonItemReorder={(e: IonReorderEvent): void =>
                  e.detail.complete()
                }
              >
                <IonItemDivider>
                  <IonLabel>Selected Gold Standard</IonLabel>
                </IonItemDivider>

                <IonReorder>
                  <IonItem>
                    <IonIcon icon={reorderThreeOutline} slot="start" />
                    <IonLabel>goldstandard1</IonLabel>
                  </IonItem>
                </IonReorder>

                <IonItemDivider>
                  <IonLabel>Selected Matching Result</IonLabel>
                </IonItemDivider>

                <IonReorder>
                  <IonItem>
                    <IonIcon icon={reorderThreeOutline} slot="start" />
                    <IonLabel>magellan-20200707</IonLabel>
                  </IonItem>
                </IonReorder>

                <IonReorder>
                  <IonItem>
                    <IonIcon icon={reorderThreeOutline} slot="start" />
                    <IonLabel>magellan-20200708</IonLabel>
                  </IonItem>
                </IonReorder>

                <IonItemDivider>
                  <IonLabel>Available Experiments</IonLabel>
                </IonItemDivider>

                <IonReorder>
                  <IonItem>
                    <IonIcon icon={reorderThreeOutline} slot="start" />
                    <IonLabel>magellan-20200709</IonLabel>
                  </IonItem>
                </IonReorder>

                <IonReorder>
                  <IonItem>
                    <IonIcon icon={reorderThreeOutline} slot="start" />
                    <IonLabel>magellan-20200710</IonLabel>
                  </IonItem>
                </IonReorder>
              </IonReorderGroup>
            </IonCard>
          </IonCol>

          <IonCol sizeSm="12" sizeMd="6" sizeLg="6" sizeXl="6">
            <IonCard>
              <IonHeader data-tip="Error: More than one matching result selected!">
                <IonToolbar>
                  <IonTitle>Actions</IonTitle>
                </IonToolbar>
              </IonHeader>
              {/* Todo: Simulate disabled with CSS so we can use data-tip */}
              <IonItem button disabled>
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
              <IonItem button>
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
              <IonItem button>
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
