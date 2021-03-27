/*------------ See README.txt for license and copyright information! -----------*/
import { d3Selection } from 'components/VennDiagram/venn/types/types';

export const drawText = (
  selection: d3Selection,
  position: { x: number; y: number },
  text: string
): d3Selection =>
  selection
    .append('text')
    .attr('x', position.x)
    .attr('y', position.y)
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .text(text);
