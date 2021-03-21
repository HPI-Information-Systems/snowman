import { clearStage } from 'components/VennDiagram/venn/draw';
import { stageFourEllipsisOn } from 'components/VennDiagram/venn/fourSets';
import { stageThreeCirclesOn } from 'components/VennDiagram/venn/threeSets';
import { VennTooltip } from 'components/VennDiagram/venn/tooltip';
import { d3Selection } from 'components/VennDiagram/venn/types';
import * as d3 from 'd3';
import React, { useEffect } from 'react';

export interface VennDiagramProps {
  sets: string[];
}

export const VennDiagram = ({ sets }: VennDiagramProps): JSX.Element => {
  let svgSelection: d3Selection | null = null;
  let tooltip: VennTooltip | undefined = undefined;

  const updateSvgSelection = (ref: SVGSVGElement): void => {
    svgSelection = d3.select(ref);
    clearStage(svgSelection);
  };

  const updateTooltipSelection = (ref: HTMLDivElement): void => {
    tooltip = new VennTooltip({ element: d3.select(ref) });
  };

  useEffect((): void => {
    if (svgSelection == null) throw Error('VennDiagram canvas not rendered');
    if (tooltip == null) throw Error('VennDiagram canvas not rendered');

    switch (sets.length) {
      case 3:
        stageThreeCirclesOn(svgSelection, tooltip);
        break;
      case 4:
        stageFourEllipsisOn(svgSelection, tooltip);
        break;
      default:
        throw Error('unsupported set count for VennDiagram diagram');
    }
  }, [sets, svgSelection, tooltip]);

  return (
    <>
      <div ref={updateTooltipSelection} />
      <svg
        ref={updateSvgSelection}
        viewBox="0 0 600 500"
        style={{ background: '#FCFCFC' }}
      />
    </>
  );
};
