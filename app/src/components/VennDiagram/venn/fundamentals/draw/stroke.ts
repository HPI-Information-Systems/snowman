import { select } from 'd3';

import { VennDiagramTooltip } from '../../tooltip';
import { d3Selection } from '../../types/types';
import { animateStroke, animateTooltip } from '../animation';

export const drawStroke = (
  selection: d3Selection,
  callback: () => void,
  tooltipDrawer: VennDiagramTooltip,
  tooltip: string
): d3Selection =>
  selection
    .style('fill-opacity', 0)
    .style('fill', 'black')
    .on('click', callback)
    .call(animateStroke.bind(undefined, 'white'))
    .call(animateTooltip.bind(undefined, tooltipDrawer, tooltip))
    .on('mouseover.opacity', function () {
      select(this).transition('fill').style('fill-opacity', 0.4);
    })
    .on('mouseout.opacity', function () {
      select(this).transition('fill').style('fill-opacity', 0);
    });
