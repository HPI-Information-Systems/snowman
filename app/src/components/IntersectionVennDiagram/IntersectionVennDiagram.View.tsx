import { sortBy } from 'lodash';
import { useEffect, useState } from 'react';
import React from 'react';

import VennDiagram from '../VennDiagram/VennDiagram';
import {
  IntersectionVennDiagramConfig,
  IntersectionVennDiagramConfigStrategy,
} from './config';
import { IntersectionVennDiagramProps } from './IntersectionVennDiagramProps';
import { IntersectionVennDiagramDisplayStrategy } from './strategies/display';
import { IntersectionVennDiagramSelectStrategy } from './strategies/select';

export default function IntersectionVennDiagramView({
  excluded,
  ignored,
  included,
  counts,
  intersect,
}: IntersectionVennDiagramProps): JSX.Element {
  const [
    configCreator,
    setConfigCreator,
  ] = useState<IntersectionVennDiagramConfig>(createConfigCreator());
  const [
    strategy,
    setStrategy,
  ] = useState<IntersectionVennDiagramConfigStrategy>(
    new IntersectionVennDiagramDisplayStrategy(included, excluded)
  );

  function createConfigCreator() {
    return new IntersectionVennDiagramConfig(
      sortBy([...excluded, ...included, ...ignored], ({ id }) => id),
      counts,
      intersect
    );
  }

  useEffect(() => {
    setConfigCreator(createConfigCreator());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [excluded, ignored, included, counts, intersect]);

  useEffect(() => {
    if (strategy !== IntersectionVennDiagramSelectStrategy) {
      setStrategy(
        new IntersectionVennDiagramDisplayStrategy(included, excluded)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [excluded, ignored]);

  return (
    <div
      onMouseOver={() => setStrategy(IntersectionVennDiagramSelectStrategy)}
      onMouseOut={() =>
        setStrategy(
          new IntersectionVennDiagramDisplayStrategy(included, excluded)
        )
      }
    >
      <VennDiagram config={configCreator.config(strategy)}></VennDiagram>
    </div>
  );
}
