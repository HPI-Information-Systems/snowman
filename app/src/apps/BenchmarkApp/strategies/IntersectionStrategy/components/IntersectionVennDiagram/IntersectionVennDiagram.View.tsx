import { IonText } from '@ionic/react';
import { Experiment } from 'api';
import { IntersectionVennDiagramConfig } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/config';
import { IntersectionVennDiagramProps } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/IntersectionVennDiagramProps';
import { IntersectionVennDiagramDefaultStrategy } from 'apps/BenchmarkApp/strategies/IntersectionStrategy/components/IntersectionVennDiagram/strategies/default';
import { MAX_VENN_DIAGRAM_DIMENSION } from 'components/simple/VennDiagram/limits';
import VennDiagram from 'components/simple/VennDiagram/VennDiagram';
import { useEffect, useState } from 'react';
import React from 'react';

export default function IntersectionVennDiagramView({
  experiments,
  included,
  counts,
  countsLoaded,
  intersect,
  onIntersect,
  strategy = IntersectionVennDiagramDefaultStrategy,
}: IntersectionVennDiagramProps): JSX.Element {
  function createIntersectWrapper() {
    return (experiments: Experiment[]) => {
      intersect(experiments);
      if (onIntersect) {
        onIntersect(experiments);
      }
    };
  }
  const [intersectWrapper, setIntersectWrapper] = useState(
    createIntersectWrapper
  );
  const [
    configCreator,
    setConfigCreator,
  ] = useState<IntersectionVennDiagramConfig>(createConfigCreator());

  function createConfigCreator() {
    return new IntersectionVennDiagramConfig(
      experiments,
      counts,
      intersectWrapper
    );
  }

  useEffect(() => {
    setConfigCreator(createConfigCreator());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiments, included, counts, intersectWrapper]);

  useEffect(() => {
    setIntersectWrapper(createIntersectWrapper);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersect, onIntersect]);

  return (
    <>
      {experiments.length <= MAX_VENN_DIAGRAM_DIMENSION ? (
        countsLoaded ? (
          <div
            style={{ position: 'relative', cursor: 'pointer' }}
            onClick={() => intersectWrapper([])}
          >
            <div
              style={{
                background: strategy.backgroundColor,
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                opacity: 1,
                pointerEvents: 'none',
                padding: '1rem',
                fontSize: '1.5rem',
                textAlign: 'left',
              }}
            >
              <IonText color="dark">
                <b>Ω</b>
              </IonText>
            </div>
            <VennDiagram config={configCreator.config(strategy)} />
          </div>
        ) : (
          ''
        )
      ) : (
        <div
          style={{
            height: '8rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Venn Diagram of size {experiments.length} is not supported yet
          (maximum is {MAX_VENN_DIAGRAM_DIMENSION}).
        </div>
      )}
    </>
  );
}
