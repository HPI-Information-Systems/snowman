import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { BenchmarkConfiguratorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/BenchmarkConfiguratorProps';
import BinaryMetricsConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/BinaryMetricsConfigurator';
import DemoMetricsConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/DemoMetricsConfigurator';
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
      <DemoMetricsConfigurator />
      <BinaryMetricsConfigurator />
    </IonContent>
  </IonMenu>
);

export default BenchmarkConfigurator;
