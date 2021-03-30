/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearSelection,
  drawCircle,
  drawCircleStroke,
  drawIntersection,
  drawIntersectionStroke,
} from 'components/VennDiagram/venn/fundamentals/draw';
import { intersectTwoPathSet1Set2 } from 'components/VennDiagram/venn/fundamentals/paths';
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
    color: payload.x10.color ?? '#9400D3',
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
    color: payload.x01.color ?? 'orange',
  });

  drawIntersection({
    svg,
    shape: intersectTwoPathSet1Set2,
    ...payload.x11,
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
    color: payload.x10.color ?? '#9400D3',
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
    color: payload.x01.color ?? 'orange',
  });
  drawIntersectionStroke({
    svg,
    tooltipDrawer,
    shape: intersectTwoPathSet1Set2,
    ...payload.x11,
  });
};
