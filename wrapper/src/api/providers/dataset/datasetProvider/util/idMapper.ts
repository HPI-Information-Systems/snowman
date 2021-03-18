import { tables } from '../../../../database';

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

  map(unmappedId: string): number {
    return this.table.get({ unmappedId })?.id ?? this.createMapping(unmappedId);
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
