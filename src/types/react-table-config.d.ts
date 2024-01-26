import { RowData } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  export interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: string,
      value: TData | string | number,
    ) => void
  }

  export interface ColumnMeta {
    type: string
    width: string
    align: string
  }
}
