import { VennDiagramFlavors } from 'components/VennDiagram/venn/flavors';
import { VennTooltip } from 'components/VennDiagram/venn/tooltip';
import { VennDiagramProps } from 'components/VennDiagram/VennDiagramProps';
import * as d3 from 'd3';
import React, { useEffect } from 'react';

export const VennDiagram = ({ sets }: VennDiagramProps): JSX.Element => {
  let svgElement: SVGSVGElement | null = null;
  let tooltip: VennTooltip | undefined = undefined;

  const updateSvgSelection = (ref: SVGSVGElement): void => {
    svgElement = ref;
  };

  const updateTooltipSelection = (ref: HTMLDivElement): void => {
    tooltip = new VennTooltip({ element: d3.select(ref) });
  };

  useEffect((): void => {
    if (svgElement == null) throw Error('VennDiagram canvas not rendered');
    if (tooltip == null) throw Error('Tooltip element not rendered');

    if (sets.length in VennDiagramFlavors) {
      const flavor = VennDiagramFlavors[sets.length];
      svgElement.viewBox.baseVal.width = flavor.canvas.width;
      svgElement.viewBox.baseVal.height = flavor.canvas.height;
      flavor.renderer(d3.select(svgElement), tooltip);
    } else {
      throw Error('unsupported set count for VennDiagram diagram');
    }
  }, [sets, svgElement, tooltip]);

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
