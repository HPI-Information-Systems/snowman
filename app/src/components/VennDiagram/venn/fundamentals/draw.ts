/*------------ See README.txt for license and copyright information! -----------*/
import { VennDiagramTooltip } from 'components/VennDiagram/venn/tooltip';
import { d3Selection } from 'components/VennDiagram/venn/types/types';
import * as d3 from 'd3';

export const clearStage = (stage: d3Selection): void => {
  stage.selectAll('*').remove();
};

export const drawCircle = (
  stage: d3Selection,
  tooltip: VennDiagramTooltip,
  name: string,
  color: string,
  radius: number,
  center: { x: number; y: number },
  onClick: () => void,
  tipText: string
): d3Selection =>
  stage
    .append('circle')
    .style('fill', color)
    .style('fill-opacity', 0.4)
    .style('stroke', 'black')
    .style('stroke-width', '2')
    .style('stroke-opacity', 0)
    .attr('r', radius)
    .attr('cx', center.x)
    .attr('cy', center.y)
    .attr('id', name)
    .on('click', function () {
      onClick();
    })
    .on('mousemove', (event: MouseEvent) => {
      tooltip.position([event.offsetX, event.offsetY]);
    })
    .on('mouseover', function () {
      d3.select(this).transition().style('stroke-opacity', 1);
      tooltip.showText(tipText);
    })
    .on('mouseout', function () {
      d3.select(this).transition().style('stroke-opacity', 0);
      tooltip.hide();
    });

export const drawIntersection = (
  stage: d3Selection,
  tooltip: VennDiagramTooltip,
  shape: string,
  name: string,
  onClick: () => void,
  tipText: string,
  color?: string
): d3Selection =>
  stage
    .append('path')
    .attr('d', shape)
    .attr('id', name)
    .style('fill', color ?? 'black')
    .style('fill-opacity', color !== undefined ? 1 : 0)
    .style('stroke', 'white')
    .style('stroke-width', '2')
    .style('stroke-opacity', 0)
    .on('click', function () {
      onClick();
    })
    .on('mouseover', function () {
      if (color === undefined) {
        d3.select(this)
          .transition()
          .style('fill-opacity', 0.2)
          .style('stroke-opacity', 1);
      } else {
        d3.select(this).transition().style('stroke-opacity', 1);
      }
      tooltip.showText(tipText);
    })
    .on('mouseout', function () {
      if (color === undefined) {
        d3.select(this)
          .transition()
          .style('fill-opacity', 0)
          .style('stroke-opacity', 0);
      } else {
        d3.select(this).transition().style('stroke-opacity', 0);
      }
      tooltip.hide();
    })
    .on('mousemove', (event: MouseEvent) => {
      tooltip.position([event.offsetX, event.offsetY]);
    });

export const drawEllipsis = (
  stage: d3Selection,
  tooltip: VennDiagramTooltip,
  name: string,
  angle: number,
  color: string,
  position: { x: number; y: number },
  dimensions: { x: number; y: number },
  onClick: () => void,
  tipText: string
): d3Selection =>
  stage
    .append('ellipse')
    .attr('cx', position.x)
    .attr('cy', position.y)
    .attr('rx', dimensions.x)
    .attr('ry', dimensions.y)
    .attr('id', name)
    .attr(
      'transform',
      'rotate(' + angle + ' ' + position.x + ' ' + position.y + ')'
    )
    .style('fill-opacity', 0.4)
    .style('stroke-opacity', 0)
    .style('stroke', 'black')
    .style('stroke-width', '2')
    .style('stroke-opacity', 0)
    .style('fill', color)
    .on('click', function () {
      onClick();
    })
    .on('mousemove', (event: MouseEvent) => {
      tooltip.position([event.offsetX, event.offsetY]);
    })
    .on('mouseout', function () {
      d3.select(this).transition().style('stroke-opacity', 0);
      tooltip.hide();
    })
    .on('mouseover', function () {
      d3.select(this).transition().style('stroke-opacity', 1);
      tooltip.showText(tipText);
    });

export const drawText = (
  stage: d3Selection,
  position: { x: number; y: number },
  text: string
): d3Selection =>
  stage
    .append('text')
    .attr('id', 'text1')
    .attr('x', position.x)
    .attr('y', position.y)
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .text(text);
