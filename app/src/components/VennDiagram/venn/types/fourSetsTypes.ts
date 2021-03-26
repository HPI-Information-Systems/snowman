/*------------ See README.txt for license and copyright information! -----------*/
import { VennDiagramEntity } from 'components/VennDiagram/venn/types/types';

export interface VennFourSetsPayload {
  x1000: VennDiagramEntity;
  x0100: VennDiagramEntity;
  x0010: VennDiagramEntity;
  x0001: VennDiagramEntity;
  x1100: VennDiagramEntity;
  x1010: VennDiagramEntity;
  x1001: VennDiagramEntity;
  x0110: VennDiagramEntity;
  x0101: VennDiagramEntity;
  x0011: VennDiagramEntity;
  x1110: VennDiagramEntity;
  x1101: VennDiagramEntity;
  x1011: VennDiagramEntity;
  x0111: VennDiagramEntity;
  x1111: VennDiagramEntity;
}

export const VennFourSetsPayloadExample: VennFourSetsPayload = {
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
    color: 'pink',
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
