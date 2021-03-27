/*------------ See README.txt for license and copyright information! -----------*/
import { drawTooltip } from 'components/VennDiagram/venn/fundamentals/draw';
import { d3Selection } from 'components/VennDiagram/venn/types/types';

export interface VennDiagramTooltipProps {
  element: d3Selection;
}

export class VennDiagramTooltip {
  protected readonly tooltip: d3Selection;

  constructor(props: VennDiagramTooltipProps) {
    this.tooltip = props.element;
    drawTooltip(this.tooltip);
  }

  hide(): void {
    this.tooltip.style('opacity', 0);
  }

  show(): void {
    this.tooltip.style('opacity', 0.9);
  }

  position(target: [number, number]): void {
    this.tooltip
      .style('left', Math.round(target[0]) + 'px')
      .style('top', Math.round(target[1] + 40) + 'px');
  }

  showText(text: string): void {
    this.tooltip.text(text);
    this.show();
  }
}
