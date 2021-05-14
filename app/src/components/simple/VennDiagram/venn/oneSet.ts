/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearSelection,
  drawCircle,
  drawCircleStroke,
} from 'components/simple/VennDiagram/venn/fundamentals/draw';
import { VennDiagramTooltip } from 'components/simple/VennDiagram/venn/tooltip';
import { VennDiagramOneSetConfig } from 'components/simple/VennDiagram/venn/types/oneSetTypes';
import { d3Selection } from 'components/simple/VennDiagram/venn/types/types';

export const drawOneSetVennDiagram = (
  svg: d3Selection,
  tooltipDrawer: VennDiagramTooltip,
  payload: VennDiagramOneSetConfig
): void => {
  clearSelection(svg);
  svg.attr('viewBox', '0 0 600 300');

  drawCircle({
    svg,
    radius: 130,
    position: {
      x: 300,
      y: 150,
    },
    ...payload.x1,
    color: payload.x1.color ?? '#9400D3',
  });

  drawCircleStroke({
    svg,
    tooltipDrawer,
    radius: 130,
    position: {
      x: 300,
      y: 150,
    },
    textPosition: { x: 300, y: 150 },
    ...payload.x1,
  });
};
