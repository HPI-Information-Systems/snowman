import type { schemas } from '../schemas';

export type DataTypes = 'NULL' | 'INTEGER' | 'REAL' | 'TEXT' | 'BLOB';
export type BasicDataType<
  DataType extends DataTypes = DataTypes
> = DataType extends 'NULL'
  ? null
  : DataType extends 'INTEGER'
  ? number
  : DataType extends 'REAL'
  ? number
  : string;

export type ColumnDataType<
  ColumnT extends Column
> = ColumnT['notNull'] extends true
  ? BasicDataType<ColumnT['dataType']>
  : BasicDataType<ColumnT['dataType']> | null;

export type ColumnValues<Columns extends TableSchema['columns']> = {
  [key in keyof Columns]: ColumnDataType<Columns[key]>;
};

export type NullableColumnValues<Columns extends TableSchema['columns']> = {
  [key in keyof Columns]?: ColumnDataType<Columns[key]>;
};

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
