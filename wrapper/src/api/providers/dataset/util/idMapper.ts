import { tables } from '../../../database';

export class DatasetIDMapper {
  private readonly table;
  private firstMappingCreated = false;

  constructor(datasetId: number) {
    this.table = tables.dataset.datasetIdMap(datasetId);
    this.table.create();
  }

  private createMapping(unmappedId: string): number {
    let id: number | undefined = undefined;
    if (!this.firstMappingCreated) {
      this.firstMappingCreated = true;
      if (this.numberMappedIds() === 0) {
        id = 0;
      }
    }
    return this.table.upsert([{ id, unmappedId }])[0];
  }

  map(unmappedId: string, maximumNumberOfMappedIds?: number): number {
    const id = this.table.get({ unmappedId })?.id;
    if (typeof id !== 'number') {
      if (
        maximumNumberOfMappedIds !== undefined &&
        this.numberMappedIds() >= maximumNumberOfMappedIds
      ) {
        throw new Error(`The id ${unmappedId} does not exist in the dataset.`);
      } else {
        return this.createMapping(unmappedId);
      }
    } else {
      return id;
    }
  }

  mapReversed(mappedId: number): string | undefined {
    return this.table.get({ id: mappedId })?.unmappedId;
  }

  numberMappedIds(): number {
    return this.table.count();
  }

  deleteAll(): void {
    this.table.dropTable(false);
  }
}
