/*------------ See README.txt for license and copyright information! -----------*/
import { drawStroke } from 'components/simple/VennDiagram/venn/fundamentals/draw/stroke';
import { drawText } from 'components/simple/VennDiagram/venn/fundamentals/draw/text';
import { VennDiagramTooltip } from 'components/simple/VennDiagram/venn/tooltip';
import {
  d3Selection,
  VennDiagramSet,
} from 'components/simple/VennDiagram/venn/types/types';

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
}: {
  svg: d3Selection;
  position: { x: number; y: number };
  dimensions: { x: number; y: number };
  angle?: number;
  color: string;
} & VennDiagramSet): d3Selection =>
  baseEllipsis(svg, position, dimensions, angle)
    .style('fill-opacity', opacity)
    .style('fill', color);

export const drawEllipsisStroke = ({
  svg,
  position,
  dimensions,
  angle,
  tooltipDrawer,
  tooltip,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback = () => {},
  textPosition,
  text,
}: {
  svg: d3Selection;
  position: { x: number; y: number };
  dimensions: { x: number; y: number };
  angle?: number;
  tooltipDrawer: VennDiagramTooltip;
  textPosition: { x: number; y: number };
} & VennDiagramSet): d3Selection =>
  baseEllipsis(svg, position, dimensions, angle)
    .call((selection) =>
      drawStroke(selection, callback, tooltipDrawer, tooltip)
    )
    .call(() => {
      if (text) {
        drawText(svg, textPosition, text);
      }
    });
