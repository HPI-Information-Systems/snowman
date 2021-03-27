/*------------ See README.txt for license and copyright information! -----------*/
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import {
  d3Selection,
  VennDiagramSet,
} from 'components/VennDiagram/venn/types/types';

import { drawStroke } from './stroke';
import { drawText } from './text';

const baseEllipsis = (
  svg: d3Selection,
  position: { x: number; y: number },
  dimensions: { x: number; y: number },
  angle = 0
) =>
  svg
    .append('ellipse')
    .attr('cx', position.x)
    .attr('cy', position.y)
    .attr('rx', dimensions.x)
    .attr('ry', dimensions.y)
    .attr(
      'transform',
      'rotate(' + angle + ' ' + position.x + ' ' + position.y + ')'
    );

export const drawEllipsis = ({
  svg,
  position,
  dimensions,
  angle,
  color,
  opacity = 0.4,
  textPosition,
  text,
}: {
  svg: d3Selection;
  position: { x: number; y: number };
  dimensions: { x: number; y: number };
  angle?: number;
  color: string;
  textPosition: { x: number; y: number };
  text?: string;
} & VennDiagramSet): d3Selection =>
  baseEllipsis(svg, position, dimensions, angle)
    .style('fill-opacity', opacity)
    .style('fill', color)
    .call(() => {
      if (text) {
        drawText(svg, textPosition, text);
      }
    });

export const drawEllipsisStroke = ({
  svg,
  position,
  dimensions,
  angle,
  tooltipDrawer,
  tooltip,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback = () => {},
}: {
  svg: d3Selection;
  position: { x: number; y: number };
  dimensions: { x: number; y: number };
  angle?: number;
  tooltipDrawer: VennDiagramTooltip;
} & VennDiagramSet): d3Selection =>
  baseEllipsis(svg, position, dimensions, angle).call((selection) =>
    drawStroke(selection, callback, tooltipDrawer, tooltip)
  );
