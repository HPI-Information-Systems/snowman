import type { schemas } from '../schemas';

type DataTypes = 'NULL' | 'INTEGER' | 'REAL' | 'TEXT' | 'BLOB';
export type TSDataType<DataType extends DataTypes> = DataType extends 'NULL'
  ? null
  : DataType extends 'INTEGER'
  ? number
  : DataType extends 'REAL'
  ? number
  : string;
export declare interface Column<DataType extends DataTypes = DataTypes> {
  readonly name: string;
  readonly dataType: DataType;
  readonly primaryKey?: DataType extends 'INTEGER' ? boolean : false;
  readonly autoIncrement?: DataType extends 'INTEGER' ? boolean : false;
  readonly notNull?: boolean;
  readonly foreignKeys?: () => { table: TableSchema; column: Column }[];
}

export declare interface TableSchema<
  SchemaT extends Schema = Schema,
  TableT extends string = string
> {
  readonly name: TableT;
  readonly schema: SchemaT;
  readonly columns: { [name: string]: Column };
  readonly indices?: Column[][];
}

export type ForeignKeys = ReturnType<NonNullable<Column['foreignKeys']>>;
export type Columns = TableSchema['columns'];

export type Schema = typeof schemas[number];
export type Schemas<
  SchemaT extends Schema = Schema,
  TableT extends string[] = string[]
> = {
  [schema in SchemaT]: {
    [table in TableT[number]]:
      | (TableSchema<SchemaT, TableT[number]> & { autoInstall: boolean })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | ((...args: any[]) => TableSchema<SchemaT, string>);
  };
};
