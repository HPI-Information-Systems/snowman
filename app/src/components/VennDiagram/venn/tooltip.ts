/*------------ See README.txt for license and copyright information! -----------*/
import { drawTooltip } from 'components/VennDiagram/venn/fundamentals/draw';
import { d3Selection } from 'components/VennDiagram/venn/types/types';

export interface VennDiagramTooltipProps {
  element: d3Selection;
  id?: string;
}

export class VennDiagramTooltip {
  private readonly tooltip: d3Selection;

  constructor(props: VennDiagramTooltipProps) {
    this.tooltip = props.element;
    this.initTooltip(props.id ?? 'vennDiagramTooltipElement');
  }

  private initTooltip(id: string): void {
    drawTooltip(this.tooltip, id);
  }

  public hide(): void {
    this.tooltip.style('opacity', 0);
  }

  public show(): void {
    this.tooltip.style('opacity', 0.9);
  }

  public setText(text: string): void {
    this.tooltip.text(text);
  }

  public position(target: [number, number]): void {
    this.tooltip
      .style('left', Math.round(target[0]) + 'px')
      .style('top', Math.round(target[1] + 40) + 'px');
  }

  public showText(text: string): void {
    this.setText(text);
    this.show();
  }
}
