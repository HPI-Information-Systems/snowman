import { VennIntersection } from 'components/VennDiagram/venn/types';

export interface VennThreeSets {
  x100: VennIntersection;
  x010: VennIntersection;
  x001: VennIntersection;
  x110: VennIntersection;
  x101: VennIntersection;
  x011: VennIntersection;
  x111: VennIntersection;
}

export const VennThreeSetsExample = {
  x100: {
    title: 'set 1',
    callback: (): void => {
      console.log('clicked set 1');
    },
    tooltip: 'n-items',
    color: 'red',
  },
  x010: {
    title: 'set 2',
    callback: (): void => {
      console.log('clicked set 2');
    },
    tooltip: 'n-items',
    color: 'purple',
  },
  x001: {
    title: 'set 3',
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
