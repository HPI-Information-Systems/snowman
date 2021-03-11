import { Cluster, ClusterID, NodeID } from '../types';

export class Node implements Cluster {
  private readonly children: Node[] = [];
  private parent: Node = this;
  private rank = 0;
  private _length = 1;

  get length(): number {
    return this._length;
  }

  get id(): ClusterID {
    return this.root._clusterId;
  }

  constructor(
    public _clusterId: ClusterID,
    protected readonly nodeId: NodeID
  ) {}

  *[Symbol.iterator](): IterableIterator<NodeID> {
    yield this.nodeId;
    for (const child of this.children) {
      child.parent = this.parent;
      yield* child;
    }
  }

  get root(): Node {
    let root = this as Node;
    while (root !== root.parent) {
      root = root.parent;
    }
    let node = this as Node;
    let parent = node.parent;
    while (parent !== root) {
      node.parent = root;
      node = parent;
      parent = node.parent;
    }
    return root;
  }

  get isRoot(): boolean {
    return this.parent === this;
  }

  /**
   * !Only call on and with roots
   */
  union(otherRoot: Node): boolean {
    if (this !== otherRoot) {
      if (this.rank > otherRoot.rank) {
        this.children.push(otherRoot);
        otherRoot.parent = this;
        this._length += otherRoot.length;
      } else {
        otherRoot.children.push(this);
        this.parent = otherRoot;
        otherRoot._length += this.length;
        if (this.rank === otherRoot.rank) {
          otherRoot.rank++;
        }
      }
      return true;
    } else {
      return false;
    }
  }
}
