import { randomInt } from 'crypto';

import { Subclustering } from '../subclustering';
import { expectCorrectSubClusteringOrder } from '../test/clusteringOrder';
import { expectSubClusteringsToEqual } from '../test/utility';
import { NodeLink } from '../types';
import { UnionFind } from '../unionFind';
import { TrackableUnionFind } from '../unionFind/trackableUnionFind';
import { ModularSubclustering } from './modularSubclustering';

const MIN_NUMBER_NODES = 10;
const MAX_NUMBER_NODES = 40;
const MIN_NUMBER_LINKS = 2;
const MAX_NUMBER_LINKS = 60;

const NUMBER_RUNS = 50;

const testCases: [NodeLink[], NodeLink[], number][] = [];

for (let index = 0; index < NUMBER_RUNS; ++index) {
  const numberNodes = randomInt(MIN_NUMBER_NODES, MAX_NUMBER_NODES);
  const links: NodeLink[][] = [];
  for (let index = 0; index < 2; index++) {
    const numberLinks = randomInt(MIN_NUMBER_LINKS, MAX_NUMBER_LINKS);
    const nodeLinks: NodeLink[] = [];
    links.push(nodeLinks);
    for (let link = 0; link < numberLinks; ++link) {
      nodeLinks.push([
        randomInt(0, numberNodes - 1),
        randomInt(0, numberNodes - 1),
      ]);
    }
  }
  testCases.push([...(links as [NodeLink[], NodeLink[]]), numberNodes]);
}

describe.each(testCases)(
  'Modular Subclustering',
  (modularLinks, fixedLinks, numberNodes) => {
    const fixedPartition = new UnionFind(numberNodes);
    fixedPartition.link(fixedLinks);
    const trackableBase = new TrackableUnionFind(numberNodes);
    const modularSubclustering = new ModularSubclustering(
      fixedPartition,
      new Subclustering(trackableBase, fixedPartition)
    );
    const groupSize = randomInt(1, modularLinks.length - 1);
    test.each(
      modularLinks
        .map((_, index) => [index + 1])
        .filter(([end]) => end % groupSize === 0)
    )('constructed correctly', (end) => {
      const links = modularLinks.slice(end - groupSize, end);
      const merges = trackableBase.trackedLink(links);
      modularSubclustering.update(merges);
      const expectedSubcluster = new Subclustering(
        trackableBase,
        fixedPartition
      );
      expectSubClusteringsToEqual(modularSubclustering, expectedSubcluster);
      expectCorrectSubClusteringOrder(modularSubclustering);
    });
  }
);
