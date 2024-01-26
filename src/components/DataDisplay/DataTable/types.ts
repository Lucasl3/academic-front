export interface IHeader {
  name: string
  key: string
  type?: 'default' | 'element' | 'editable' | 'tag'
  width?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
}

export interface IDataTableProps<Data> {
  data: Array<Data>
  headers: Array<IHeader>
  isLoading?: boolean
  selectableRow?: boolean
  onRowSelectionChange?: (selectedRows: Array<Data>) => void
  highlightedText?: string
  highlightedColumns?: Array<string>
}
