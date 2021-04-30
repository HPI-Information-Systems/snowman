import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';
import IntersectionSelector from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionSelector/IntersectionSelector';
import { IntersectionVennDiagramConfigStrategy } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/config';
import IntersectionVennDiagram from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/IntersectionVennDiagram';
import { IntersectionVennDiagramIntersectionStrategy } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/strategies/intersection';
import { IntersectionStrategyProps } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/IntersectionStrategyProps';
import DataViewer from 'components/simple/DataViewer/DataViewer';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import React, { useEffect, useMemo, useState } from 'react';
import { intersectionDescription } from 'utils/intersectionDescription';

const IntersectionStrategyView = ({
  loadTuples,
  tuplesCount,
  pairCount,
  included,
  excluded,
  ignored,
  loadCounts,
  isValidConfig,
}: IntersectionStrategyProps): JSX.Element => {
  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  const [
    strategy,
    setStrategy,
  ] = useState<IntersectionVennDiagramConfigStrategy>(
    new IntersectionVennDiagramIntersectionStrategy(included, excluded, ignored)
  );
  useEffect(() => {
    setStrategy(
      new IntersectionVennDiagramIntersectionStrategy(
        included,
        excluded,
        ignored
      )
    );
  }, [included, excluded, ignored]);

  const intersectionDescriptionString = useMemo(
    () =>
      intersectionDescription({
        excluded: excluded.map(({ name }) => name),
        included: included.map(({ name }) => name),
        pairCount,
      }),
    [excluded, included, pairCount]
  );

  return (
    <>
      {!isValidConfig ? (
        <ErroneousBackdrop
          message={
            'Please select at least one experiment - but all from a single dataset!'
          }
        />
      ) : null}
      <IonGrid>
        <IonRow>
          <IonCol className="col-no-padding" size="12" sizeXl="6">
            <IonRow>
              <IonCol className="col-no-padding">
                <IonCard>
                  <IntersectionVennDiagram strategy={strategy} />
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="col-no-padding">
                <IntersectionSelector />
              </IonCol>
            </IonRow>
          </IonCol>
          <IonCol className="col-no-padding" size="12" sizeXl="6">
            <IonCard style={{ height: '80vh' }}>
              <IonCardHeader>
                <b>{intersectionDescriptionString}</b>
              </IonCardHeader>
              <IonCardContent
                style={{
                  height: '72vh',
                }}
              >
                <DataViewer
                  loadTuples={loadTuples}
                  tuplesCount={tuplesCount}
                  title={intersectionDescriptionString}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default IntersectionStrategyView;
