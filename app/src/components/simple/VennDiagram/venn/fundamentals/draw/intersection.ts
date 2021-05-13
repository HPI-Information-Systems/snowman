/*------------ See README.txt for license and copyright information! -----------*/
import { drawStroke } from 'components/simple/VennDiagram/venn/fundamentals/draw/stroke';
import { VennDiagramTooltip } from 'components/simple/VennDiagram/venn/tooltip';
import {
  d3Selection,
  VennDiagramIntersection,
} from 'components/simple/VennDiagram/venn/types/types';

const baseIntersection = (svg: d3Selection, shape: string) =>
  svg.append('path').attr('d', shape);

export const drawIntersection = ({
  svg,
  shape,
  color,
}: {
  svg: d3Selection;
  shape: string;
  transform?: string;
} & VennDiagramIntersection): d3Selection =>
  baseIntersection(svg, shape)
    .style('fill', color ?? 'black')
    .style('fill-opacity', color !== undefined ? 1 : 0);

export const drawIntersectionStroke = ({
  svg,
  shape,
  tooltipDrawer,
  tooltip,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback = () => {},
}: {
  svg: d3Selection;
  shape: string;
  tooltipDrawer: VennDiagramTooltip;
} & VennDiagramIntersection): d3Selection =>
  baseIntersection(svg, shape).call((selection) =>
    drawStroke(selection, callback, tooltipDrawer, tooltip)
  );
