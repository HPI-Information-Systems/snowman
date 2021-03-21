/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearStage,
  drawCircle,
  drawIntersection,
  drawText,
} from 'components/VennDiagram/venn/draw';
import { intersectThreePathSet1Set2 } from 'components/VennDiagram/venn/paths';
import { VennTooltip } from 'components/VennDiagram/venn/tooltip';
import { d3Selection } from 'components/VennDiagram/venn/types';

export const stageTwoCirclesOn = (
  stage: d3Selection,
  tooltip: VennTooltip
): void => {
  clearStage(stage);

  // Set 1
  drawCircle(stage, tooltip, 'circle1', '#00bf00', 110, { x: 230, y: 156 });
  drawText(stage, { x: 180, y: 125 }, 'circle1');
  // Set 2
  drawCircle(stage, tooltip, 'circle2', '#007fff', 110, { x: 370, y: 156 });
  drawText(stage, { x: 420, y: 125 }, 'circle2');

  drawIntersection(
    stage,
    tooltip,
    intersectThreePathSet1Set2,
    'intersectThreePathSet1Set2'
  ).style('transform', 'matrix(1,0,0,1,-0.5,-150)');
};
