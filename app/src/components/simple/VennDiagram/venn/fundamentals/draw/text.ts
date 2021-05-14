/*------------ See README.txt for license and copyright information! -----------*/
import { d3Selection } from 'components/simple/VennDiagram/venn/types/types';

export const drawText = (
  selection: d3Selection,
  position: { x: number; y: number },
  text: string
): d3Selection =>
  selection
    .append('text')
    .attr('x', position.x)
    .attr('y', position.y)
    .attr('fill', 'currentColor')
    .style('font-weight', '1000')
    .attr('text-anchor', 'middle')
    .text(text.length > 15 ? text.substring(0, 12).trimEnd() + '...' : text)
    .style('pointer-events', 'none');
