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
import { StrategyIDs } from 'apps/BenchmarkApp/types/StrategyIDs';
import { stringifyExperimentEntity } from 'apps/BenchmarkApp/utils/experimentEntity';
import PageStruct from 'apps/SnowmanApp/components/GenericSubInstance/GenericSubApp/PageStruct/PageStruct';
import DataViewer from 'components/simple/DataViewer/DataViewer';
import ErroneousBackdrop from 'components/simple/ErroneousBackdrop/ErroneousBackdrop';
import React, { useEffect, useMemo, useState } from 'react';
import {
  intersectionDescription,
  intersectionFileName,
} from 'utils/intersectionHelpers';

const IntersectionStrategyView = ({
  loadTuples,
  tuplesCount,
  pairCount,
  included,
  excluded,
  ignored,
  isValidConfig,
}: IntersectionStrategyProps): JSX.Element => {
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
        excluded: excluded.map(stringifyExperimentEntity),
        included: included.map(stringifyExperimentEntity),
        pairCount,
      }),
    [excluded, included, pairCount]
  );

  const intersectionFileNameString = useMemo(
    () =>
      intersectionFileName({
        excluded: excluded.map(stringifyExperimentEntity),
        included: included.map(stringifyExperimentEntity),
      }),
    [excluded, included]
  );

  return (
    <PageStruct
      pageTitle={StrategyIDs.NaryIntersection}
      enableScroll={isValidConfig}
    >
      <ErroneousBackdrop
        shouldShow={!isValidConfig}
        message={
          'Please select at least one experiment - but all from a single dataset!'
        }
      />
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
                  fileName={intersectionFileNameString}
                />
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonGrid>
    </PageStruct>
  );
};

export default IntersectionStrategyView;
