/*------------ See README.txt for license and copyright information! -----------*/
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import { d3Selection } from 'components/VennDiagram/venn/types/types';
import { select } from 'd3';

export const animateTooltip = (
  tooltipDrawer: VennDiagramTooltip,
  tooltip: string,
  selection: d3Selection
): d3Selection =>
  selection
    .on('mouseover.tooltip', () => {
      tooltipDrawer.showText(tooltip);
    })
    .on('mouseout.tooltip', () => {
      tooltipDrawer.hide();
    })
    .on('mousemove.tooltip', (event: MouseEvent) => {
      tooltipDrawer.position([event.offsetX, event.offsetY]);
    });

export const animateStroke = (
  color: string,
  selection: d3Selection
): d3Selection =>
  selection
    .style('stroke', color)
    .style('paint-order', 'stroke')
    .style('stroke-width', '2')
    .style('stroke-opacity', 0)
    .on('mouseover.stroke', function () {
      select(this).transition('stroke').style('stroke-opacity', 1);
    })
    .on('mouseout.stroke', function () {
      select(this).transition('stroke').style('stroke-opacity', 0);
    });
