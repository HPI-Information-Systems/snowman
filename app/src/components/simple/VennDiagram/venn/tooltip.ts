/*------------ See README.txt for license and copyright information! -----------*/
import { drawTooltip } from 'components/simple/VennDiagram/venn/fundamentals/draw';
import { d3Selection } from 'components/simple/VennDiagram/venn/types/types';

export class VennDiagramTooltip {
  protected readonly tooltip: d3Selection;

  constructor(element: d3Selection) {
    this.tooltip = element;
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
