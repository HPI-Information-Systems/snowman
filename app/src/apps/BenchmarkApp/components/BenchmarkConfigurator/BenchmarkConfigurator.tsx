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
import IntersectionConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/IntersectionConfigurator';
import NMetricsConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/NMetricsConfigurator';
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
      <NMetricsConfigurator />
      <IntersectionConfigurator />
    </IonContent>
  </IonMenu>
);

export default BenchmarkConfigurator;
