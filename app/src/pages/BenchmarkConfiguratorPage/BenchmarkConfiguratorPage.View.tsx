import {
  IonCard,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import NextFab from 'components/NextFab/NextFab';
import PageStruct from 'components/PageStruct/PageStruct';
import { menuOutline } from 'ionicons/icons';
import React from 'react';
import { IonReorderEvent } from 'types/IonReorderEvent';

const BenchmarkConfiguratorPageView = (): JSX.Element => (
  <PageStruct title="Benchmark Configurator">
    <IonGrid>
      <IonRow>
        <IonCol size="3">
          <IonCard>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Benchmark</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonReorderGroup
              disabled={false}
              onIonItemReorder={(e: IonReorderEvent): void =>
                e.detail.complete()
              }
            >
              <IonItemDivider>
                <IonLabel>Selected Experiments</IonLabel>
              </IonItemDivider>

              <IonReorder>
                <IonItem>
                  <IonIcon icon={menuOutline} slot="start" />
                  <IonLabel>Item 1</IonLabel>
                </IonItem>
              </IonReorder>

              <IonReorder>
                <IonItem>
                  <IonIcon icon={menuOutline} slot="start" />
                  <IonLabel>Item 2</IonLabel>
                </IonItem>
              </IonReorder>

              <IonItemDivider>
                <IonLabel>All Experiments</IonLabel>
              </IonItemDivider>

              <IonReorder>
                <IonItem>
                  <IonIcon icon={menuOutline} slot="start" />
                  <IonLabel>Item 3</IonLabel>
                </IonItem>
              </IonReorder>

              <IonReorder>
                <IonItem>
                  <IonIcon icon={menuOutline} slot="start" />
                  <IonLabel>Item 4</IonLabel>
                </IonItem>
              </IonReorder>

              <IonReorder>
                <IonItem>
                  <IonIcon icon={menuOutline} slot="start" />
                  <IonLabel>Item 5</IonLabel>
                </IonItem>
              </IonReorder>

              <IonReorder>
                <IonItem>
                  <IonIcon icon={menuOutline} slot="start" />
                  <IonLabel>Item 6</IonLabel>
                </IonItem>
              </IonReorder>

              <IonReorder>
                <IonItem>
                  <IonIcon icon={menuOutline} slot="start" />
                  <IonLabel>Item 7</IonLabel>
                </IonItem>
              </IonReorder>

              <IonReorder>
                <IonItem>
                  <IonIcon icon={menuOutline} slot="start" />
                  <IonLabel>Item 8</IonLabel>
                </IonItem>
              </IonReorder>
            </IonReorderGroup>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonGrid>
    <NextFab />
  </PageStruct>
);

export default BenchmarkConfiguratorPageView;
