import {
  IonContent,
  IonHeader,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { BenchmarkConfiguratorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/BenchmarkConfiguratorProps';
import MultiSelector from 'apps/BenchmarkApp/components/BenchmarkConfigurator/components/MultiSelector/MultiSelector';
import React from 'react';

const BenchmarkConfigurator = ({
  contentId,
}: BenchmarkConfiguratorProps): JSX.Element => (
  <IonMenu contentId={contentId}>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Configurator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <MultiSelector title={'1. Select experiment'} />
        <MultiSelector title={'2. Select experiment'} />
        <MultiSelector title={'3. Select experiment'} />
      </IonList>
    </IonContent>
  </IonMenu>
);

export default BenchmarkConfigurator;
