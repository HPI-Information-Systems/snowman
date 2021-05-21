/*------------ See README.txt for license and copyright information! -----------*/
import {
  VennDiagramIntersection,
  VennDiagramSet,
} from 'components/simple/VennDiagram/venn/types/types';

export interface VennDiagramFourSetsConfig {
  x1000: VennDiagramSet;
  x0100: VennDiagramSet;
  x0010: VennDiagramSet;
  x0001: VennDiagramSet;
  x1100: VennDiagramIntersection;
  x1010: VennDiagramIntersection;
  x1001: VennDiagramIntersection;
  x0110: VennDiagramIntersection;
  x0101: VennDiagramIntersection;
  x0011: VennDiagramIntersection;
  x1110: VennDiagramIntersection;
  x1101: VennDiagramIntersection;
  x1011: VennDiagramIntersection;
  x0111: VennDiagramIntersection;
  x1111: VennDiagramIntersection;
}

export const VennFourSetsPayloadExample: VennDiagramFourSetsConfig = {
  x1000: {
    text: 'set 1',
    callback: (): void => {
      console.log('clicked set 1');
    },
    tooltip: 'n-items',
    color: 'red',
  },
  x0100: {
    text: 'set 2',
    callback: (): void => {
      console.log('clicked set 2');
    },
    tooltip: 'n-items',
    color: 'pink',
  },
  x0010: {
    text: 'set 3',
    callback: (): void => {
      console.log('clicked set 3');
    },
    tooltip: 'n-items',
    color: 'cyan',
  },
  x0001: {
    text: 'set 4',
    callback: (): void => {
      console.log('clicked set 4');
    },
    tooltip: 'n-items',
    color: 'orange',
  },
  x1100: {
    callback: (): void => {
      console.log('clicked intersection x1100');
    },
    tooltip: 'n-items',
  },
  x1010: {
    callback: (): void => {
      console.log('clicked intersection x1010');
    },
    tooltip: 'n-items',
  },
  x1001: {
    callback: (): void => {
      console.log('clicked intersection x1001');
    },
    tooltip: 'n-items',
  },
  x0110: {
    callback: (): void => {
      console.log('clicked intersection x0110');
    },
    tooltip: 'n-items',
  },
  x0101: {
    callback: (): void => {
      console.log('clicked intersection x0101');
    },
    tooltip: 'n-items',
  },
  x0011: {
    callback: (): void => {
      console.log('clicked intersection x0011');
    },
    tooltip: 'n-items',
  },
  x1110: {
    callback: (): void => {
      console.log('clicked intersection x1110');
    },
    tooltip: 'n-items',
  },
  x1101: {
    callback: (): void => {
      console.log('clicked intersection x1101');
    },
    tooltip: 'n-items',
  },
  x1011: {
    callback: (): void => {
      console.log('clicked intersection x1011');
    },
    tooltip: 'n-items',
  },
  x0111: {
    callback: (): void => {
      console.log('clicked intersection x0111');
    },
    tooltip: 'n-items',
  },
  x1111: {
    callback: (): void => {
      console.log('clicked intersection x1111');
    },
    tooltip: 'n-items',
  },
};
