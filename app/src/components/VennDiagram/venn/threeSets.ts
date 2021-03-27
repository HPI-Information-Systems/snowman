/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearSelection,
  drawCircle,
  drawIntersection,
} from 'components/VennDiagram/venn/fundamentals/draw';
import {
  intersectThreePathSet1Set2,
  intersectThreePathSet1Set2Set3,
  intersectThreePathSet1Set3,
  intersectThreePathSet2Set3,
} from 'components/VennDiagram/venn/fundamentals/paths';
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import { VennThreeSetsPayload } from 'components/VennDiagram/venn/types/threeSetsTypes';
import { d3Selection } from 'components/VennDiagram/venn/types/types';

export const drawThreeSetVennDiagram = (
  svg: d3Selection,
  tooltipDrawer: VennDiagramTooltip,
  payload: VennThreeSetsPayload
): void => {
  clearSelection(svg);
  svg.attr('viewBox', '0 0 600 400');

  drawCircle({
    svg,
    tooltipDrawer,
    radius: 110,
    position: {
      x: 230,
      y: 256,
    },
    textPosition: { x: 180, y: 275 },
    ...payload.x100,
    color: payload.x100.color ?? '#00bf00',
  });
  drawCircle({
    svg,
    tooltipDrawer,
    radius: 110,
    position: {
      x: 370,
      y: 256,
    },
    textPosition: { x: 420, y: 275 },
    ...payload.x010,
    color: payload.x010.color ?? '#007fff',
  });
  drawCircle({
    svg,
    tooltipDrawer,
    radius: 110,
    position: {
      x: 300,
      y: 135,
    },
    textPosition: { x: 300, y: 90 },
    ...payload.x001,
    color: payload.x001.color ?? '#ff3433',
  });

  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectThreePathSet1Set2,
    ...payload.x110,
    transform: 'matrix(1,0,0,1,-0.5,-50)',
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectThreePathSet1Set3,
    ...payload.x101,
    transform: 'matrix(1,0,0,1,-0.5,-50)',
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectThreePathSet2Set3,
    ...payload.x011,
    transform: 'matrix(1,0,0,1,0,-50)',
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectThreePathSet1Set2Set3,
    ...payload.x111,
    transform: 'matrix(1,0,0,1,0,-50)',
  });
};
