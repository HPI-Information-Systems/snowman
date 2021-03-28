/*------------ See README.txt for license and copyright information! -----------*/
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import {
  d3Selection,
  VennDiagramSet,
} from 'components/VennDiagram/venn/types/types';

import { animateStroke, animateTooltip } from '../animation';
import { drawText } from './text';

export const drawEllipsis = ({
  svg,
  position,
  dimensions,
  angle = 0,
  tooltipDrawer,
  tooltip,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback = () => {},
  color,
  opacity = 0.4,
  textPosition,
  text,
}: {
  svg: d3Selection;
  position: { x: number; y: number };
  dimensions: { x: number; y: number };
  angle?: number;
  tooltipDrawer: VennDiagramTooltip;
  color: string;
  textPosition: { x: number; y: number };
  text?: string;
} & VennDiagramSet): d3Selection =>
  svg
    .append('ellipse')
    .attr('cx', position.x)
    .attr('cy', position.y)
    .attr('rx', dimensions.x)
    .attr('ry', dimensions.y)
    .attr(
      'transform',
      'rotate(' + angle + ' ' + position.x + ' ' + position.y + ')'
    )
    .style('fill-opacity', opacity)
    .style('fill', color)
    .on('click', callback)
    .call(animateStroke.bind(undefined, 'black'))
    .call(animateTooltip.bind(undefined, tooltipDrawer, tooltip))
    .call(() => {
      if (text) {
        drawText(svg, textPosition, text);
      }
    });
