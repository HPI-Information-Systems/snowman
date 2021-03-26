/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearStage,
  drawCircle,
  drawIntersection,
  drawText,
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

export const stageThreeCirclesOn = (
  stage: d3Selection,
  tooltip: VennDiagramTooltip,
  payload: VennThreeSetsPayload
): void => {
  clearStage(stage);

  // Set 1
  drawCircle(
    stage,
    tooltip,
    'circle1',
    payload.x100.color ?? '#00bf00',
    110,
    {
      x: 230,
      y: 256,
    },
    payload.x100.callback,
    payload.x100.tooltip
  );
  if (payload.x100.title !== undefined) {
    drawText(stage, { x: 180, y: 275 }, payload.x100.title);
  }
  // Set 2
  drawCircle(
    stage,
    tooltip,
    'circle2',
    payload.x010.color ?? '#007fff',
    110,
    {
      x: 370,
      y: 256,
    },
    payload.x010.callback,
    payload.x010.tooltip
  );
  if (payload.x010.title !== undefined) {
    drawText(stage, { x: 420, y: 275 }, payload.x010.title);
  }
  // Set 3
  drawCircle(
    stage,
    tooltip,
    'circle3',
    payload.x001.color ?? '#ff3433',
    110,
    {
      x: 300,
      y: 135,
    },
    payload.x001.callback,
    payload.x001.tooltip
  );
  if (payload.x001.title !== undefined) {
    drawText(stage, { x: 300, y: 90 }, payload.x001.title);
  }

  drawIntersection(
    stage,
    tooltip,
    intersectThreePathSet1Set2,
    'intersectThreePathSet1Set2',
    payload.x110.callback,
    payload.x110.tooltip,
    payload.x110.color
  ).style('transform', 'matrix(1,0,0,1,-0.5,-50)');
  drawIntersection(
    stage,
    tooltip,
    intersectThreePathSet1Set3,
    'intersectThreePathSet1Set3',
    payload.x101.callback,
    payload.x101.tooltip,
    payload.x101.color
  ).style('transform', 'matrix(1,0,0,1,-0.5,-50)');
  drawIntersection(
    stage,
    tooltip,
    intersectThreePathSet2Set3,
    'intersectThreePathSet2Set3',
    payload.x011.callback,
    payload.x011.tooltip,
    payload.x011.color
  ).style('transform', 'matrix(1,0,0,1,0,-50)');
  drawIntersection(
    stage,
    tooltip,
    intersectThreePathSet1Set2Set3,
    'intersectThreePathSet1Set2Set3',
    payload.x111.callback,
    payload.x111.tooltip,
    payload.x111.color
  ).style('transform', 'matrix(1,0,0,1,0,-50)');
};
