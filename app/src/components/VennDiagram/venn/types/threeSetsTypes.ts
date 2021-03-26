/*------------ See README.txt for license and copyright information! -----------*/
import { VennDiagramEntity } from 'components/VennDiagram/venn/types/types';

export interface VennThreeSetsPayload {
  x100: VennDiagramEntity;
  x010: VennDiagramEntity;
  x001: VennDiagramEntity;
  x110: VennDiagramEntity;
  x101: VennDiagramEntity;
  x011: VennDiagramEntity;
  x111: VennDiagramEntity;
}

export const VennThreeSetsPayloadExample = {
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
    color: 'pink',
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
