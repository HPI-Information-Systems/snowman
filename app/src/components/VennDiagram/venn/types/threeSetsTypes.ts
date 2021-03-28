/*------------ See README.txt for license and copyright information! -----------*/
import {
  VennDiagramIntersection,
  VennDiagramSet,
} from 'components/VennDiagram/venn/types/types';

export interface VennThreeSetsPayload {
  x100: VennDiagramSet;
  x010: VennDiagramSet;
  x001: VennDiagramSet;
  x110: VennDiagramIntersection;
  x101: VennDiagramIntersection;
  x011: VennDiagramIntersection;
  x111: VennDiagramIntersection;
}

export const VennThreeSetsPayloadExample: VennThreeSetsPayload = {
  x100: {
    text: 'set 1',
    callback: (): void => {
      console.log('clicked set 1');
    },
    tooltip: 'n-items',
    color: 'red',
  },
  x010: {
    text: 'set 2',
    callback: (): void => {
      console.log('clicked set 2');
    },
    tooltip: 'n-items',
    color: 'pink',
  },
  x001: {
    text: 'set 3',
    callback: (): void => {
      console.log('clicked set 3');
    },
    tooltip: 'n-items',
    color: 'orange',
  },
  x110: {
    callback: (): void => {
      console.log('clicked intersection x110');
    },
    tooltip: 'n-items',
  },
  x101: {
    callback: (): void => {
      console.log('clicked intersection x101');
    },
    tooltip: 'n-items',
  },
  x011: {
    callback: (): void => {
      console.log('clicked intersection x011');
    },
    tooltip: 'n-items',
  },
  x111: {
    callback: (): void => {
      console.log('clicked intersection x111');
    },
    tooltip: 'n-items',
  },
};
