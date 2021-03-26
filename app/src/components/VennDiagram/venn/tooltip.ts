/*------------ See README.txt for license and copyright information! -----------*/
import { d3Selection } from 'components/VennDiagram/venn/types/types';

export interface VennTooltipProps {
  element: d3Selection;
}

export class VennTooltip {
  private tooltip: d3Selection;
  constructor(props: VennTooltipProps) {
    this.tooltip = props.element;
    this.initTooltip();
  }

  private initTooltip(): void {
    this.tooltip
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
