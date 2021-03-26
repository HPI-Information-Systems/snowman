/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearStage,
  drawCircle,
  drawIntersection,
  drawText,
} from 'components/VennDiagram/venn/fundamentals/draw';
import { intersectThreePathSet1Set2 } from 'components/VennDiagram/venn/fundamentals/paths';
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import { VennTwoSetsPayload } from 'components/VennDiagram/venn/types/twoSetsTypes';
import { d3Selection } from 'components/VennDiagram/venn/types/types';

export const stageTwoCirclesOn = (
  stage: d3Selection,
  tooltip: VennDiagramTooltip,
  payload: VennTwoSetsPayload
): void => {
  clearStage(stage);

  // Set 1
  drawCircle(
    stage,
    tooltip,
    'circle1',
    payload.x10.color ?? '#00bf00',
    110,
    {
      x: 230,
      y: 156,
    },
    payload.x10.callback,
    payload.x10.tooltip
  );
  if (payload.x10.title !== undefined) {
    drawText(stage, { x: 180, y: 125 }, payload.x10.title);
  }
  // Set 2
  drawCircle(
    stage,
    tooltip,
    'circle2',
    payload.x01.color ?? '#007fff',
    110,
    {
      x: 370,
      y: 156,
    },
    payload.x01.callback,
    payload.x01.tooltip
  );
  if (payload.x01.title !== undefined) {
    drawText(stage, { x: 420, y: 125 }, payload.x01.title);
  }

  drawIntersection(
    stage,
    tooltip,
    intersectThreePathSet1Set2,
    'intersectThreePathSet1Set2',
    payload.x11.callback,
    payload.x11.tooltip,
    payload.x11.color
  ).style('transform', 'matrix(1,0,0,1,-0.5,-150)');
};
