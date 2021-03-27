/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearSelection,
  drawCircle,
  drawCircleStroke,
  drawIntersection,
  drawIntersectionStroke,
} from 'components/VennDiagram/venn/fundamentals/draw';
import { intersectThreePathSet1Set2 } from 'components/VennDiagram/venn/fundamentals/paths';
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import { VennDiagramTwoSetsConfig } from 'components/VennDiagram/venn/types/twoSetsTypes';
import { d3Selection } from 'components/VennDiagram/venn/types/types';

export const drawTwoSetVennDiagram = (
  svg: d3Selection,
  tooltipDrawer: VennDiagramTooltip,
  payload: VennDiagramTwoSetsConfig
): void => {
  clearSelection(svg);
  svg.attr('viewBox', '0 0 600 320');

  drawCircle({
    svg,
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
    shape: intersectThreePathSet1Set2,
    ...payload.x11,
    transform: 'matrix(1,0,0,1,-0.5,-150)',
  });
  drawCircleStroke({
    svg,
    tooltipDrawer,
    radius: 110,
    position: {
      x: 230,
      y: 156,
    },
    ...payload.x10,
    color: payload.x10.color ?? '#00bf00',
  });
  drawCircleStroke({
    svg,
    tooltipDrawer,
    radius: 110,
    position: {
      x: 370,
      y: 156,
    },
    ...payload.x01,
    color: payload.x01.color ?? '#007fff',
  });
  drawIntersectionStroke({
    svg,
    tooltipDrawer,
    shape: intersectThreePathSet1Set2,
    ...payload.x11,
    transform: 'matrix(1,0,0,1,-0.5,-150)',
  });
};
