import { Readable } from 'stream';

import { CSVInserter } from '../csvInserter';

export class ClusterERExperimentInserter extends CSVInserter {
  protected readonly separator: string = ',';
  protected readonly quote: string = '"';
  protected readonly escape: string = "'";

  protected readonly requiredColumns: string[] = ['Cluster_Id', 'id'];

  protected addRow({
    Cluster_Id,
    id,
  }: {
    Cluster_Id: string;
    id: string;
  }): void {
    this.cluster(Cluster_Id).push(id);
  }

  private clusters = new Map<string, string[]>();
  private cluster(clusterId: string): string[] {
    let cluster = this.clusters.get(clusterId);
    if (!cluster) {
      cluster = [];
      this.clusters.set(clusterId, cluster);
    }
    return cluster;
  }

  private addDuplicates(): void {
    for (const cluster of this.clusters.values()) {
      for (let index = 1; index < cluster.length; index++) {
        this.addDuplicate(cluster[index - 1], cluster[index]);
      }
    }
  }

  async insert_internal(file: Readable): Promise<void> {
    await super.insert_internal(file);
    this.addDuplicates();
  }
}
