/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearStage,
  drawEllipsis,
  drawIntersection,
  drawText,
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

export const stageFourEllipsisOn = (
  stage: d3Selection,
  tooltip: VennDiagramTooltip,
  payload: VennFourSetsPayload
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
    payload.x1000.callback,
    payload.x1000.tooltip
  );
  if (payload.x1000.title !== undefined) {
    drawText(
      stage,
      { x: 110, y: 240 },
      'fourSetsTextSet1',
      payload.x1000.title
    );
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
    payload.x0100.callback,
    payload.x0100.tooltip
  );
  if (payload.x0100.title !== undefined) {
    drawText(stage, { x: 180, y: 65 }, 'fourSetsTextSet2', payload.x0100.title);
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
    payload.x0010.callback,
    payload.x0010.tooltip
  );
  if (payload.x0010.title !== undefined) {
    drawText(stage, { x: 410, y: 65 }, 'fourSetsTextSet3', payload.x0010.title);
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
    payload.x0001.callback,
    payload.x0001.tooltip
  );
  if (payload.x0001.title !== undefined) {
    drawText(
      stage,
      { x: 480, y: 240 },
      'fourSetsTextSet4',
      payload.x0001.title
    );
  }

  // Intersections
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2,
    'intersectFourPathSet1Set2',
    payload.x1100.callback,
    payload.x1100.tooltip,
    payload.x1100.color
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set3,
    'intersectFourPathSet1Set3',
    payload.x1010.callback,
    payload.x1010.tooltip,
    payload.x1010.color
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set4,
    'intersectFourPathSet1Set4',
    payload.x1001.callback,
    payload.x1001.tooltip,
    payload.x1001.color
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet2Set3,
    'intersectFourPathSet2Set3',
    payload.x0110.callback,
    payload.x0110.tooltip,
    payload.x0110.color
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet2Set4,
    'intersectFourPathSet2Set4',
    payload.x0101.callback,
    payload.x0101.tooltip,
    payload.x0101.color
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet3Set4,
    'intersectFourPathSet3Set4',
    payload.x0011.callback,
    payload.x0011.tooltip,
    payload.x0011.color
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2Set3,
    'intersectFourPathSet1Set2Set3',
    payload.x1110.callback,
    payload.x1110.tooltip,
    payload.x1110.color
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2Set4,
    'intersectFourPathSet1Set2Set4',
    payload.x1101.callback,
    payload.x1101.tooltip,
    payload.x1101.color
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set3Set4,
    'intersectFourPathSet1Set3Set4',
    payload.x1011.callback,
    payload.x1011.tooltip,
    payload.x1011.color
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet2Set3Set4,
    'intersectFourPathSet2Set3Set4',
    payload.x0111.callback,
    payload.x0111.tooltip,
    payload.x0111.color
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2Set3Set4,
    'intersectFourPathSet1Set2Set3Set4',
    payload.x1111.callback,
    payload.x1111.tooltip,
    payload.x1111.color
  );
};
