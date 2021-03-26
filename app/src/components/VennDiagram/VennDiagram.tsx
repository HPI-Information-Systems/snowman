import { stageFourEllipsisOn } from 'components/VennDiagram/venn/fourSets';
import { stageThreeCirclesOn } from 'components/VennDiagram/venn/threeSets';
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import { stageTwoCirclesOn } from 'components/VennDiagram/venn/twoSets';
import { VennFourSetsPayload } from 'components/VennDiagram/venn/types/fourSetsTypes';
import { VennThreeSetsPayload } from 'components/VennDiagram/venn/types/threeSetsTypes';
import { VennTwoSetsPayload } from 'components/VennDiagram/venn/types/twoSetsTypes';
import {
  VennDiagramFlavors,
  VennDiagramProps,
} from 'components/VennDiagram/VennDiagramProps';
import * as d3 from 'd3';
import React, { useEffect } from 'react';

export const VennDiagram = ({
  flavor,
  payload,
}: VennDiagramProps): JSX.Element => {
  // Attention - will be updated for prop update!
  let svgElement: SVGSVGElement | null = null;
  let tooltip: VennDiagramTooltip | undefined = undefined;

  const updateSvgSelection = (ref: SVGSVGElement): void => {
    svgElement = ref;
  };

  const updateTooltipSelection = (ref: HTMLDivElement): void => {
    tooltip = new VennDiagramTooltip({ element: d3.select(ref) });
  };

  useEffect((): void => {
    if (svgElement == null) throw Error('VennDiagram canvas not rendered');
    if (tooltip == null) throw Error('Tooltip element not rendered');

    switch (flavor) {
      case VennDiagramFlavors.TwoSets:
        svgElement.viewBox.baseVal.width = 600;
        svgElement.viewBox.baseVal.height = 320;
        stageTwoCirclesOn(
          d3.select(svgElement),
          tooltip,
          payload as VennTwoSetsPayload
        );
        break;
      case VennDiagramFlavors.ThreeSets:
        svgElement.viewBox.baseVal.width = 600;
        svgElement.viewBox.baseVal.height = 400;
        stageThreeCirclesOn(
          d3.select(svgElement),
          tooltip,
          payload as VennThreeSetsPayload
        );
        break;
      case VennDiagramFlavors.FourSets:
        svgElement.viewBox.baseVal.width = 600;
        svgElement.viewBox.baseVal.height = 430;
        stageFourEllipsisOn(
          d3.select(svgElement),
          tooltip,
          payload as VennFourSetsPayload
        );
        break;
      default:
        throw Error('unsupported set count for VennDiagram diagram');
    }
  }, [flavor, payload, svgElement, tooltip]);

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

export default VennDiagram;
