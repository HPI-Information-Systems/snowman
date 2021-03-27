/*------------ See README.txt for license and copyright information! -----------*/
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import {
  d3Selection,
  VennDiagramIntersection,
} from 'components/VennDiagram/venn/types/types';
import * as d3 from 'd3';

import { animateStroke, animateTooltip } from '../animation';

export const drawIntersection = ({
  svg,
  shape,
  transform = '',
  tooltipDrawer,
  tooltip,
  color,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback = () => {},
}: {
  svg: d3Selection;
  shape: string;
  transform?: string;
  tooltipDrawer: VennDiagramTooltip;
} & VennDiagramIntersection): d3Selection =>
  svg
    .append('path')
    .attr('d', shape)
    .style('transform', transform)
    .style('fill', color ?? 'black')
    .style('fill-opacity', color !== undefined ? 1 : 0)
    .on('click', callback)
    .on('mouseover.opacity', function () {
      if (color === undefined) {
        d3.select(this).transition().style('fill-opacity', 0.2);
      }
    })
    .on('mouseout.opacity', function () {
      if (color === undefined) {
        d3.select(this).transition().style('fill-opacity', 0);
      }
    })
    .call(animateStroke.bind(undefined, 'white'))
    .call(animateTooltip.bind(undefined, tooltipDrawer, tooltip));
