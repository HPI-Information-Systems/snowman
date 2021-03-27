/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearSelection,
  drawCircle,
} from 'components/VennDiagram/venn/fundamentals/draw';
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import { VennDiagramOneSetConfig } from 'components/VennDiagram/venn/types/oneSetTypes';
import { d3Selection } from 'components/VennDiagram/venn/types/types';

export const drawOneSetVennDiagram = (
  svg: d3Selection,
  tooltipDrawer: VennDiagramTooltip,
  payload: VennDiagramOneSetConfig
): void => {
  clearSelection(svg);
  svg.attr('viewBox', '0 0 600 600');

  drawCircle({
    svg,
    tooltipDrawer,
    radius: 130,
    position: {
      x: 300,
      y: 300,
    },
    textPosition: { x: 300, y: 300 },
    ...payload.x1,
    color: payload.x1.color ?? '#00bf00',
  });
};
