/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearSelection,
  drawEllipsis,
  drawIntersection,
} from 'components/VennDiagram/venn/fundamentals/draw';
import {
  intersectFourPathSet1Set2,
  intersectFourPathSet1Set2Set3,
  intersectFourPathSet1Set2Set3Set4,
  intersectFourPathSet1Set2Set4,
  intersectFourPathSet1Set3,
  intersectFourPathSet1Set3Set4,
  intersectFourPathSet1Set4,
  intersectFourPathSet2Set3,
  intersectFourPathSet2Set3Set4,
  intersectFourPathSet2Set4,
  intersectFourPathSet3Set4,
} from 'components/VennDiagram/venn/fundamentals/paths';
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import { VennFourSetsPayload } from 'components/VennDiagram/venn/types/fourSetsTypes';
import { d3Selection } from 'components/VennDiagram/venn/types/types';

export const drawFourSetVennDiagram = (
  svg: d3Selection,
  tooltipDrawer: VennDiagramTooltip,
  payload: VennFourSetsPayload
): void => {
  clearSelection(svg);
  svg.attr('viewBox', '0 0 600 430');

  drawEllipsis({
    svg,
    tooltipDrawer,
    angle: 45,
    position: { x: 196, y: 246 },
    dimensions: { x: 200, y: 110 },
    textPosition: { x: 110, y: 240 },
    ...payload.x1000,
    color: payload.x1000.color ?? 'red',
  });
  drawEllipsis({
    svg,
    tooltipDrawer,
    angle: 45,
    position: { x: 266, y: 176 },
    dimensions: { x: 200, y: 110 },
    textPosition: { x: 180, y: 65 },
    ...payload.x0100,
    color: payload.x0100.color ?? 'purple',
  });
  drawEllipsis({
    svg,
    tooltipDrawer,
    angle: 135,
    position: { x: 326, y: 176 },
    textPosition: { x: 410, y: 65 },
    dimensions: { x: 200, y: 110 },
    ...payload.x0010,
    color: payload.x0010.color ?? 'cyan',
  });
  drawEllipsis({
    svg,
    tooltipDrawer,
    angle: 135,
    position: { x: 396, y: 246 },
    dimensions: { x: 200, y: 110 },
    textPosition: { x: 480, y: 240 },
    ...payload.x0001,
    color: payload.x0001.color ?? 'orange',
  });

  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet1Set2,
    ...payload.x1100,
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet1Set3,
    ...payload.x1010,
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet1Set4,
    ...payload.x1001,
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet2Set3,
    ...payload.x0110,
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet2Set4,
    ...payload.x0101,
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet3Set4,
    ...payload.x0011,
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet1Set2Set3,
    ...payload.x1110,
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet1Set2Set4,
    ...payload.x1101,
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet1Set3Set4,
    ...payload.x1011,
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet2Set3Set4,
    ...payload.x0111,
  });
  drawIntersection({
    svg,
    tooltipDrawer,
    shape: intersectFourPathSet1Set2Set3Set4,
    ...payload.x1111,
  });
};
