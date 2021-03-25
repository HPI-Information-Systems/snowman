/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearStage,
  drawEllipsis,
  drawIntersection,
  drawText,
} from 'components/VennDiagram/venn/draw';
import { VennFourSets } from 'components/VennDiagram/venn/fourSetsTypes';
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
} from 'components/VennDiagram/venn/paths';
import { VennTooltip } from 'components/VennDiagram/venn/tooltip';
import { d3Selection } from 'components/VennDiagram/venn/types';

export const stageFourEllipsisOn = (
  stage: d3Selection,
  tooltip: VennTooltip,
  payload: VennFourSets
): void => {
  clearStage(stage);

  // Set 1
  drawEllipsis(
    stage,
    tooltip,
    'ellipsis1',
    45,
    payload.x1000.color ?? 'red',
    { x: 196, y: 246 },
    { x: 200, y: 110 },
    payload.x1000.tooltip
  );
  if (payload.x1000.title !== undefined) {
    drawText(stage, { x: 110, y: 240 }, payload.x1000.title);
  }
  // Set 2
  drawEllipsis(
    stage,
    tooltip,
    'ellipsis2',
    45,
    payload.x0100.color ?? 'purple',
    { x: 266, y: 176 },
    { x: 200, y: 110 },
    payload.x0100.tooltip
  );
  if (payload.x0100.title !== undefined) {
    drawText(stage, { x: 180, y: 65 }, payload.x0100.title);
  }
  // Set 3
  drawEllipsis(
    stage,
    tooltip,
    'ellipsis3',
    135,
    payload.x0010.color ?? 'cyan',
    { x: 326, y: 176 },
    { x: 200, y: 110 },
    payload.x0010.tooltip
  );
  if (payload.x0010.title !== undefined) {
    drawText(stage, { x: 410, y: 65 }, payload.x0010.title);
  }
  // Set 4
  drawEllipsis(
    stage,
    tooltip,
    'ellipsis4',
    135,
    payload.x0001.color ?? 'orange',
    { x: 396, y: 246 },
    { x: 200, y: 110 },
    payload.x0001.tooltip
  );
  if (payload.x0001.title !== undefined) {
    drawText(stage, { x: 480, y: 240 }, payload.x0001.title);
  }

  // Intersections
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2,
    'intersectFourPathSet1Set2',
    payload.x1100.tooltip
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set3,
    'intersectFourPathSet1Set3',
    payload.x1010.tooltip
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set4,
    'intersectFourPathSet1Set4',
    payload.x1001.tooltip
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet2Set3,
    'intersectFourPathSet2Set3',
    payload.x0110.tooltip
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet2Set4,
    'intersectFourPathSet2Set4',
    payload.x0101.tooltip
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet3Set4,
    'intersectFourPathSet3Set4',
    payload.x0011.tooltip
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2Set3,
    'intersectFourPathSet1Set2Set3',
    payload.x1110.tooltip
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2Set4,
    'intersectFourPathSet1Set2Set4',
    payload.x1101.tooltip
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set3Set4,
    'intersectFourPathSet1Set3Set4',
    payload.x1011.tooltip
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet2Set3Set4,
    'intersectFourPathSet2Set3Set4',
    payload.x0111.tooltip
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2Set3Set4,
    'intersectFourPathSet1Set2Set3Set4',
    payload.x1111.tooltip
  );
};
