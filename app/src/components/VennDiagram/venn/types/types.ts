import type { Selection } from 'd3';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type d3Selection = Selection<any, any, any, any>;

export interface VennDiagramEntity {
  tooltip: string;
  color?: string;
  callback?: () => void;
}

export interface VennDiagramSet extends VennDiagramEntity {
  text: string;
  opacity?: number;
}

export type VennDiagramIntersection = VennDiagramEntity;
