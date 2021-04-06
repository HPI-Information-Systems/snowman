/*------------ See README.txt for license and copyright information! -----------*/
import {
  drawEllipsis,
  drawEllipsisStroke,
} from 'components/VennDiagram/venn/fundamentals/draw/ellipsis';
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import {
  d3Selection,
  VennDiagramSet,
} from 'components/VennDiagram/venn/types/types';

export const drawCircle = (
  settings: {
    svg: d3Selection;
    radius: number;
    position: { x: number; y: number };
    color: string;
  } & VennDiagramSet
): d3Selection =>
  drawEllipsis({
    ...settings,
    angle: 0,
    dimensions: { x: settings.radius, y: settings.radius },
  });

export const drawCircleStroke = (
  settings: {
    svg: d3Selection;
    radius: number;
    position: { x: number; y: number };
    tooltipDrawer: VennDiagramTooltip;
    textPosition: { x: number; y: number };
  } & VennDiagramSet
): d3Selection =>
  drawEllipsisStroke({
    ...settings,
    angle: 0,
    dimensions: { x: settings.radius, y: settings.radius },
  });
