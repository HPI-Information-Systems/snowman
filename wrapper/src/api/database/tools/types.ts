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

export declare interface Column<
  DataType extends DataTypes = DataTypes,
  NameT extends string = string,
  PrimaryKeyT extends DataType extends 'INTEGER'
    ? boolean
    : false = DataType extends 'INTEGER' ? boolean : false
> {
  readonly name: NameT;
  readonly dataType: DataType;
  readonly primaryKey?: PrimaryKeyT;
  readonly autoIncrement?: PrimaryKeyT extends true ? boolean : false;
  readonly notNull?: boolean;
  readonly foreignKeys?: () => { table: TableSchema; column: Column }[];
}

export declare interface TableSchema<
  SchemaT extends Schema = Schema,
  TableT extends string = string,
  ColumnNames extends string[] = string[]
> {
  readonly name: TableT;
  readonly schema: SchemaT;
  readonly columns: { [name in ColumnNames[number]]: Column<DataTypes, name> };
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
      | (TableSchema<SchemaT, table> & { autoInstall: boolean })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      | ((...args: any[]) => TableSchema<SchemaT, string>);
  };
};
