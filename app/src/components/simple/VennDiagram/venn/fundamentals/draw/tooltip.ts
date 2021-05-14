/*------------ See README.txt for license and copyright information! -----------*/
import { d3Selection } from 'components/simple/VennDiagram/venn/types/types';

export const drawTooltip = (selection: d3Selection): d3Selection =>
  selection
    .text('undefined')
    .style('position', 'absolute')
    .style('top', '50')
    .style('left', '50')
    .style('background-color', '#222')
    .style('color', 'white')
    .style('padding', '5px')
    .style('border', '1px solid transparent')
    .style('border-radius', '3px')
    .style('opacity', 0);
