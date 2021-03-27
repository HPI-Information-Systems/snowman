/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearSelection,
  drawCircle,
  drawIntersection,
} from 'components/VennDiagram/venn/fundamentals/draw';
import { intersectThreePathSet1Set2 } from 'components/VennDiagram/venn/fundamentals/paths';
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import { VennTwoSetsPayload } from 'components/VennDiagram/venn/types/twoSetsTypes';
import { d3Selection } from 'components/VennDiagram/venn/types/types';

export const drawTwoSetVennDiagram = (
  svg: d3Selection,
  tooltipDrawer: VennDiagramTooltip,
  payload: VennTwoSetsPayload
): void => {
  clearSelection(svg);
  svg.attr('viewBox', '0 0 600 320');

  drawCircle({
    svg,
    tooltipDrawer,
    radius: 110,
    position: {
      x: 230,
      y: 156,
    },
    textPosition: { x: 180, y: 125 },
    ...payload.x10,
    color: payload.x10.color ?? '#00bf00',
  });
  drawCircle({
    svg,
    tooltipDrawer,
    radius: 110,
    position: {
      x: 370,
      y: 156,
    },
    textPosition: { x: 420, y: 125 },
    ...payload.x01,
    color: payload.x01.color ?? '#007fff',
  });

  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectThreePathSet1Set2,
    ...payload.x11,
    transform: 'matrix(1,0,0,1,-0.5,-150)',
  });
};
