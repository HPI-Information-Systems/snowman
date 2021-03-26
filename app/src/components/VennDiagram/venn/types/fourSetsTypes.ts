import { VennIntersection } from 'components/VennDiagram/venn/types/types';

export interface VennFourSets {
  x1000: VennIntersection;
  x0100: VennIntersection;
  x0010: VennIntersection;
  x0001: VennIntersection;
  x1100: VennIntersection;
  x1010: VennIntersection;
  x1001: VennIntersection;
  x0110: VennIntersection;
  x0101: VennIntersection;
  x0011: VennIntersection;
  x1110: VennIntersection;
  x1101: VennIntersection;
  x1011: VennIntersection;
  x0111: VennIntersection;
  x1111: VennIntersection;
}

export const VennFourSetsExample: VennFourSets = {
  x1000: {
    title: 'set 1',
    callback: (): void => {
      console.log('clicked set 1');
    },
    tooltip: 'n-items',
    color: 'red',
  },
  x0100: {
    title: 'set 2',
    callback: (): void => {
      console.log('clicked set 2');
    },
    tooltip: 'n-items',
    color: 'purple',
  },
  x0010: {
    title: 'set 3',
    callback: (): void => {
      console.log('clicked set 3');
    },
    tooltip: 'n-items',
    color: 'cyan',
  },
  x0001: {
    title: 'set 4',
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
