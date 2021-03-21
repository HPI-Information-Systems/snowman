/*------------ See README.txt for license and copyright information! -----------*/
import {
  clearStage,
  drawEllipsis,
  drawIntersection,
} from 'components/VennDiagram/venn/draw';
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
  tooltip: VennTooltip
): void => {
  clearStage(stage);

  // Set 1
  drawEllipsis(
    stage,
    tooltip,
    'ellipsis1',
    45,
    'red',
    { x: 196, y: 246 },
    { x: 200, y: 110 }
  );
  // Set 2
  drawEllipsis(
    stage,
    tooltip,
    'ellipsis2',
    45,
    'gray',
    { x: 266, y: 176 },
    { x: 200, y: 110 }
  );
  // Set 3
  drawEllipsis(
    stage,
    tooltip,
    'ellipsis3',
    135,
    'cyan',
    { x: 326, y: 176 },
    { x: 200, y: 110 }
  );
  // Set 4
  drawEllipsis(
    stage,
    tooltip,
    'ellipsis4',
    135,
    'orange',
    { x: 396, y: 246 },
    { x: 200, y: 110 }
  );

  // Intersections
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2,
    'intersectFourPathSet1Set2'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set3,
    'intersectFourPathSet1Set3'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set4,
    'intersectFourPathSet1Set4'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet2Set3,
    'intersectFourPathSet2Set3'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet2Set4,
    'intersectFourPathSet2Set4'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet3Set4,
    'intersectFourPathSet3Set4'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2Set3,
    'intersectFourPathSet1Set2Set3'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2Set4,
    'intersectFourPathSet1Set2Set4'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set3Set4,
    'intersectFourPathSet1Set3Set4'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet2Set3Set4,
    'intersectFourPathSet2Set3Set4'
  );
  drawIntersection(
    stage,
    tooltip,
    intersectFourPathSet1Set2Set3Set4,
    'intersectFourPathSet1Set2Set3Set4'
  );
};
