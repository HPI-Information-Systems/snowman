/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearStage,
  drawCircle,
  drawIntersection,
  drawText,
} from 'components/VennDiagram/venn/draw';
import {
  intersectThreePathSet1Set2,
  intersectThreePathSet1Set2Set3,
  intersectThreePathSet1Set3,
  intersectThreePathSet2Set3,
} from 'components/VennDiagram/venn/paths';
import { VennThreeSets } from 'components/VennDiagram/venn/threeSetsTypes';
import { VennTooltip } from 'components/VennDiagram/venn/tooltip';
import { d3Selection } from 'components/VennDiagram/venn/types';

export const stageThreeCirclesOn = (
  stage: d3Selection,
  tooltip: VennTooltip,
  payload: VennThreeSets
): void => {
  clearStage(stage);

  // Set 1
  drawCircle(stage, tooltip, 'circle1', '#00bf00', 110, { x: 230, y: 306 });
  drawText(stage, { x: 180, y: 325 }, 'circle1');
  // Set 2
  drawCircle(stage, tooltip, 'circle2', '#007fff', 110, { x: 370, y: 306 });
  drawText(stage, { x: 420, y: 325 }, 'circle2');
  // Set 3
  drawCircle(stage, tooltip, 'circle3', '#ff3433', 110, { x: 300, y: 185 });
  drawText(stage, { x: 300, y: 140 }, 'circle3');

  drawIntersection(
    stage,
    tooltip,
    intersectThreePathSet1Set2,
    'intersectThreePathSet1Set2'
  ).style('transform', 'matrix(1,0,0,1,-0.5,0)');
  drawIntersection(
    stage,
    tooltip,
    intersectThreePathSet1Set3,
    'intersectThreePathSet1Set3'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectThreePathSet2Set3,
    'intersectThreePathSet2Set3'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectThreePathSet1Set2Set3,
    'intersectThreePathSet1Set2Set3'
  );
};
