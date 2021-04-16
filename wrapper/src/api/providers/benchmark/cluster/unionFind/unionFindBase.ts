import { numberOfPairs } from '../../../../tools/numberOfPairs';
import { Cluster, Clustering, NodeID, NodeLink } from '../types';
import { Node } from './node';

export class UnionFindBase implements Clustering {
  protected readonly nodes: Node[];
  protected readonly clusterIdToCluster: Node[];
  protected _numberClusters: number;
  protected _numberPairs = 0;
  protected _numberRows = 0;

  get numberClusters(): number {
    return this._numberClusters;
  }

  get numberPairs(): number {
    return this._numberPairs;
  }

  get numberRows(): number {
    return Math.max(0, this._numberRows - 1);
  }

  constructor(public readonly numberNodes: number) {
    this._numberClusters = numberNodes;
    this.nodes = new Array<Node>(numberNodes);
    this.clusterIdToCluster = new Array<Node>(numberNodes);
    for (let id = 0; id < numberNodes; id++) {
      this.clusterIdToCluster[id] = this.nodes[id] = new Node(id, id);
    }
  }

  protected clusterIDSwap(child: Node): void {
    this._numberClusters--;
    const nodeWithLargestClusterId = this.clusterIdToCluster[
      this._numberClusters
    ];
    nodeWithLargestClusterId._clusterId = child._clusterId;
    this.clusterIdToCluster[
      nodeWithLargestClusterId._clusterId
    ] = nodeWithLargestClusterId;
  }

  protected merge(root1: Node, root2: Node): boolean {
    const length1 = root1.length;
    const length2 = root2.length;
    if (root1.union(root2)) {
      const [newChild, newRoot] = root1.isRoot
        ? [root2, root1]
        : [root1, root2];
      this._numberPairs +=
        numberOfPairs(newRoot.length) -
        numberOfPairs(length1) -
        numberOfPairs(length2);
      if (length1 === 1 && length2 === 1) {
        this._numberRows += 3;
      } else if (length1 === 1 || length2 === 1) {
        this._numberRows += 1;
      } else {
        this._numberRows -= 1;
      }
      this.clusterIDSwap(newChild);
      return true;
    } else {
      return false;
    }
  }

  protected link(links: NodeLink[]): this {
    for (const [nodeID1, nodeID2] of links) {
      this.merge(this.nodes[nodeID1].root, this.nodes[nodeID2].root);
    }
    return this;
  }

  *clusters(): Iterable<Cluster> {
    for (let clusterId = 0; clusterId < this._numberClusters; clusterId++) {
      yield this.clusterIdToCluster[clusterId];
    }
  }

  clusterFromNodeId(nodeID: NodeID): Cluster {
    return this.nodes[nodeID].root;
  }

  clusterFromClusterId(clusterId: number): Cluster {
    return this.clusterIdToCluster[clusterId];
  }
}
