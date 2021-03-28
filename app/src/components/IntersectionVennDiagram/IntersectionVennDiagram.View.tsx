import { sortBy } from 'lodash';
import { useEffect, useState } from 'react';
import React from 'react';

import VennDiagram from '../VennDiagram/VennDiagram';
import {
  IntersectionVennDiagramConfig,
  IntersectionVennDiagramConfigStrategy,
} from './config';
import { IntersectionVennDiagramProps } from './IntersectionVennDiagramProps';
import {
  INCLUDED_COLOR,
  IntersectionVennDiagramDisplayStrategy,
} from './strategies/display';

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
    setStrategy(new IntersectionVennDiagramDisplayStrategy(included, excluded));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [excluded, ignored]);

  return (
    <div
      style={{ position: 'relative', cursor: 'pointer' }}
      onClick={() => intersect([])}
    >
      <div
        style={{
          background: `${included.length === 0 ? INCLUDED_COLOR : ''}`,
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          opacity: 0.3,
          pointerEvents: 'none',
          padding: '1rem',
          fontSize: '1.5rem',
          color: 'black',
        }}
      >
        <b>Ω</b>
      </div>
      <VennDiagram config={configCreator.config(strategy)}></VennDiagram>;
    </div>
  );
}
