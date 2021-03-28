import { drawFourSetVennDiagram } from 'components/VennDiagram/venn/fourSets';
import { drawOneSetVennDiagram } from 'components/VennDiagram/venn/oneSet';
import { drawThreeSetVennDiagram } from 'components/VennDiagram/venn/threeSets';
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import { drawTwoSetVennDiagram } from 'components/VennDiagram/venn/twoSets';
import { VennDiagramProps } from 'components/VennDiagram/VennDiagramProps';
import { select } from 'd3';
import React, { useEffect, useRef, useState } from 'react';

export const VennDiagram = ({ config }: VennDiagramProps): JSX.Element => {
  const svgElement = useRef<SVGSVGElement>(null);
  const tooltipElement = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<VennDiagramTooltip>();

  useEffect(() => {
    if (tooltipElement.current) {
      setTooltip(new VennDiagramTooltip(select(tooltipElement.current)));
    }
  }, [tooltipElement]);

  useEffect((): void => {
    if (svgElement.current && tooltip) {
      const svg = select(svgElement.current);
      if ('x1' in config) {
        drawOneSetVennDiagram(svg, tooltip, config);
      } else if ('x11' in config) {
        drawTwoSetVennDiagram(svg, tooltip, config);
      } else if ('x111' in config) {
        drawThreeSetVennDiagram(svg, tooltip, config);
      } else {
        drawFourSetVennDiagram(svg, tooltip, config);
      }
    }
  }, [config, svgElement, tooltip]);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={tooltipElement} />
      <svg ref={svgElement} />
    </div>
  );
};

export default VennDiagram;
