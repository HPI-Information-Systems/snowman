/*------------ See README.txt for license and copyright information! -----------*/
import { drawStroke } from 'components/VennDiagram/venn/fundamentals/draw/stroke';
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import {
  d3Selection,
  VennDiagramIntersection,
} from 'components/VennDiagram/venn/types/types';

const baseIntersection = (svg: d3Selection, shape: string, transform = '') =>
  svg.append('path').attr('d', shape).style('transform', transform);

export const drawIntersection = ({
  svg,
  shape,
  transform,
  color,
}: {
  svg: d3Selection;
  shape: string;
  transform?: string;
} & VennDiagramIntersection): d3Selection =>
  baseIntersection(svg, shape, transform)
    .style('fill', color ?? 'black')
    .style('fill-opacity', color !== undefined ? 1 : 0);

export const drawIntersectionStroke = ({
  svg,
  shape,
  transform,
  tooltipDrawer,
  tooltip,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  callback = () => {},
}: {
  svg: d3Selection;
  shape: string;
  transform?: string;
  tooltipDrawer: VennDiagramTooltip;
} & VennDiagramIntersection): d3Selection =>
  baseIntersection(svg, shape, transform).call((selection) =>
    drawStroke(selection, callback, tooltipDrawer, tooltip)
  );
