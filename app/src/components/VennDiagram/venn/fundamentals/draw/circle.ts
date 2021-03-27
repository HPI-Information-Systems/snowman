/*------------ See README.txt for license and copyright information! -----------*/
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import {
  d3Selection,
  VennDiagramSet,
} from 'components/VennDiagram/venn/types/types';

import { drawEllipsis } from './ellipsis';

export const drawCircle = (
  settings: {
    svg: d3Selection;
    radius: number;
    position: { x: number; y: number };
    tooltipDrawer: VennDiagramTooltip;
    color: string;
    textPosition: { x: number; y: number };
    text?: string;
  } & VennDiagramSet
): d3Selection =>
  drawEllipsis({
    ...settings,
    angle: 0,
    dimensions: { x: settings.radius, y: settings.radius },
  });
