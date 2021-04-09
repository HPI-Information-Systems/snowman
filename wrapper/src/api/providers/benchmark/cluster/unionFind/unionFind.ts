import { Cluster, Clustering, NodeID, NodeLink } from '../types';
import { Node } from './node';

export class UnionFind implements Clustering {
  protected readonly nodes: Node[];
  protected readonly clusterIdToCluster: Node[];
  protected _numberClusters: number;

  get numberClusters(): number {
    return this._numberClusters;
  }

  constructor(public readonly numberNodes: number) {
    this._numberClusters = numberNodes;
    this.nodes = new Array<Node>(numberNodes);
    this.clusterIdToCluster = new Array<Node>(numberNodes);
    for (let id = 0; id < numberNodes; id++) {
      this.clusterIdToCluster[id] = this.nodes[id] = new Node(id, id);
    }
  }

  link(links: NodeLink[]): this {
    for (const [nodeID1, nodeID2] of links) {
      const root1 = this.nodes[nodeID1].root;
      const root2 = this.nodes[nodeID2].root;
      if (root1.union(root2)) {
        this._numberClusters--;
        const newChild = root1.isRoot ? root2 : root1;
        const nodeWithLargestClusterId = this.clusterIdToCluster[
          this._numberClusters
        ];
        nodeWithLargestClusterId._clusterId = newChild._clusterId;
        this.clusterIdToCluster[
          nodeWithLargestClusterId._clusterId
        ] = nodeWithLargestClusterId;
      }
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
