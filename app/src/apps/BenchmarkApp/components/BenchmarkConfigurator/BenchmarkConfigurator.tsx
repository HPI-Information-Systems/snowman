import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { BenchmarkConfiguratorProps } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/BenchmarkConfiguratorProps';
import { StoreCacheKeyBaseEnum } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/baseKeys';
import { algorithmCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/algorithm';
import { datasetCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/dataset';
import { experimentCacheKeyAndFilter } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/experiment';
import {
  MULTI_SELECTOR_INCREMENT_ID,
  multiSelectCacheKeyAndFilter,
} from 'apps/BenchmarkApp/components/BenchmarkConfigurator/cacheKeys/cacheKeysAndFilters/multiSelect';
import BinaryMetricsConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/BinaryMetricsConfigurator';
import DecisionMatrixConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/DecisionMatrixConfigurator';
import DefaultPlaceholderConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/DefaultPlaceholderConfigurator';
import IntersectionConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/IntersectionConfigurator';
import NMetricsConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/NMetricsConfigurator';
import SimilarityDiagramConfigurator from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SimilarityDiagramConfigurator';
import { KPIDiagramConfigurator } from 'apps/BenchmarkApp/components/BenchmarkConfigurator/configurators/SoftKPIDiagramConfigurator';
import { BenchmarkAppStoreMagistrate } from 'apps/BenchmarkApp/store/BenchmarkAppStoreFactory';
import { updateSelection } from 'apps/BenchmarkApp/store/ConfigurationStore/ConfigurationStoreActions';
import React, { useEffect } from 'react';
import { SnowmanAction } from 'types/SnowmanAction';

const BenchmarkConfigurator = ({
  contentId,
}: BenchmarkConfiguratorProps): JSX.Element => {
  useEffect(() => {
    setTimeout(() => {
      BenchmarkAppStoreMagistrate.getStore().dispatch(
        (updateSelection({
          aCacheKey: datasetCacheKeyAndFilter(0).cacheKey,
          newSelection: [1],
          allowMultiple: false,
        }) as unknown) as SnowmanAction<unknown>
      );

      BenchmarkAppStoreMagistrate.getStore().dispatch(
        (updateSelection({
          aCacheKey: multiSelectCacheKeyAndFilter(
            StoreCacheKeyBaseEnum.algorithm,
            [],
            ...algorithmCacheKeyAndFilter(MULTI_SELECTOR_INCREMENT_ID).cacheKey
          ).cacheKey,
          newSelection: [
            {
              currentIds: [0, 1],
              nextId: 2,
            },
          ],
          allowMultiple: false,
        }) as unknown) as SnowmanAction<unknown>
      );
      BenchmarkAppStoreMagistrate.getStore().dispatch(
        (updateSelection({
          aCacheKey: algorithmCacheKeyAndFilter(0).cacheKey,
          newSelection: [1],
          allowMultiple: false,
        }) as unknown) as SnowmanAction<unknown>
      );
      BenchmarkAppStoreMagistrate.getStore().dispatch(
        (updateSelection({
          aCacheKey: algorithmCacheKeyAndFilter(1).cacheKey,
          newSelection: [2],
          allowMultiple: false,
        }) as unknown) as SnowmanAction<unknown>
      );

      BenchmarkAppStoreMagistrate.getStore().dispatch(
        (updateSelection({
          aCacheKey: multiSelectCacheKeyAndFilter(
            StoreCacheKeyBaseEnum.experiment,
            [0],
            ...experimentCacheKeyAndFilter(0, MULTI_SELECTOR_INCREMENT_ID)
              .cacheKey
          ).cacheKey,
          newSelection: [
            {
              currentIds: [0, 1],
              nextId: 3,
            },
          ],
          allowMultiple: false,
        }) as unknown) as SnowmanAction<unknown>
      );
      BenchmarkAppStoreMagistrate.getStore().dispatch(
        (updateSelection({
          aCacheKey: experimentCacheKeyAndFilter(0, 0).cacheKey,
          newSelection: [2],
          allowMultiple: false,
        }) as unknown) as SnowmanAction<unknown>
      );
      BenchmarkAppStoreMagistrate.getStore().dispatch(
        (updateSelection({
          aCacheKey: experimentCacheKeyAndFilter(0, 1).cacheKey,
          newSelection: [3],
          allowMultiple: false,
        }) as unknown) as SnowmanAction<unknown>
      );
    }, 500);
  }, []);
  return (
    <>
      {/* <IonMenu contentId={contentId} type="push" className={'doNotPrint'}>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Configurator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <DefaultPlaceholderConfigurator />
          <BinaryMetricsConfigurator />
          <NMetricsConfigurator />
          <IntersectionConfigurator />
          <KPIDiagramConfigurator />
          <DecisionMatrixConfigurator />
          <SimilarityDiagramConfigurator />
        </IonContent>
      </IonMenu> */}
    </>
  );
};

export default BenchmarkConfigurator;
