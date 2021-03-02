import TopologicalSort from 'topological-sort';

import { Table } from '../table';
import type { TableSchema } from '../tools/types';

export function installTables(
  ...args: ConstructorParameters<typeof TableInstaller>
): void {
  new TableInstaller(...args).installTables();
}

class TableInstaller {
  constructor(
    private readonly tables: readonly TableSchema[],
    protected raiseIfExists = false
  ) {}

  installTables(): void {
    for (const table of this.topologicallySortedTables) {
      new Table(table).create(this.raiseIfExists);
    }
  }

  protected get topologicallySortedTables(): TableSchema[] {
    const sorter = new TopologicalSort(this.tableNamesToTables);
    this.addDependencies(sorter);
    return Array.from(sorter.sort().values()).map(({ node }) => node);
  }

  protected get tableNamesToTables(): Map<string, TableSchema> {
    const nodes = new Map<string, TableSchema>();
    for (const table of this.tables) {
      nodes.set(`${table.schema}.${table.name}`, table);
    }
    return nodes;
  }

  protected addDependencies(
    sorter: TopologicalSort<string, TableSchema>
  ): void {
    for (const table of this.tables) {
      for (const dependency of this.tableDependencies(table).values()) {
        sorter.addEdge(
          `${dependency.schema}.${dependency.name}`,
          `${table.schema}.${table.name}`
        );
      }
    }
  }

  protected tableDependencies(table: TableSchema): Set<TableSchema> {
    const referencedTables = new Set<TableSchema>();
    for (const column of Object.values(table.columns)) {
      if (column.foreignKeys) {
        column
          .foreignKeys()
          .map((foreignKey) => referencedTables.add(foreignKey.table));
      }
    }
    return referencedTables;
  }
}
