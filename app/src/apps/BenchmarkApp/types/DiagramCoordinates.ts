import { DiagramCoordinates as RawDiagramCoordinates } from 'api';

export interface DiagramCoordinates extends RawDiagramCoordinates {
  tooltip?: string;
}
