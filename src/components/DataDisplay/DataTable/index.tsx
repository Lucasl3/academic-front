import React, { useEffect } from 'react'

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Input,
  Box,
  Checkbox,
  Skeleton,
  Flex,
  Highlight,
} from '@chakra-ui/react'
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  RowData,
  ColumnDef,
  CellContext,
  ColumnMeta,
} from '@tanstack/react-table'

import S from './styles'
import { IDataTableProps, IHeader } from './types'

function DataTable({
  data,
  headers,
  isLoading,
  selectableRow,
  onRowSelectionChange,
  highlightedText,
  highlightedColumns,
}: IDataTableProps<RowData>) {
  const [tableData, setTableData] = React.useState(data)
  const [columns, setColumns] = React.useState<Array<ColumnDef<RowData>>>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  const selectableColumn = React.useMemo<ColumnDef<RowData>>(() => {
    return {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          isChecked={table.getIsAllRowsSelected()}
          isIndeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Box>
          <Checkbox
            isChecked={row.getIsSelected()}
            isDisabled={!row.getCanSelect()}
            isIndeterminate={row.getIsSomeSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        </Box>
      ),
    }
  }, [])

  const tableCell = ({
    getValue,
    row,
    column,
    table,
  }: CellContext<unknown, unknown>) => {
    const initialValue = getValue()
    const columnMeta = column.columnDef.meta
    const cellType: string = columnMeta?.type ?? 'default'
    const [value, setValue] = React.useState(initialValue)

    const onBlur = () => {
      table.options.meta?.updateData(row.index, column.id, value)
    }

    const isHighlightedColumn = highlightedColumns?.includes(column.id)

    const cells = {
      editable: (
        <Input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          border="none"
        />
      ),
      element: <>{value}</>,
      default: (
        <Highlight
          query={isHighlightedColumn ? (highlightedText as string) : ''}
          styles={{ bg: 'orange.100', fontWeight: '600' }}
        >
          {String(value)}
        </Highlight>
      ),
    }

    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      (cells as Record<string, JSX.Element | undefined>)[cellType] ||
      cells.default
    )
  }

  const table = useReactTable({
    data: tableData,
    columns,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      rowSelection,
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setTableData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...(old[rowIndex] as Record<string, unknown>),
                [columnId]: value,
              }
            }
            return row
          }),
        )
      },
    },
  })

  useEffect(() => {
    formatColumns(headers)
  }, [highlightedText])

  useEffect(() => {
    setTableData(data)
  }, [data])

  useEffect(() => {
    if (onRowSelectionChange) {
      onRowSelectionChange(getSelectedRows())
    }
  }, [rowSelection, table.getSelectedRowModel()])

  const formatColumns = (columns: Array<IHeader>) => {
    const formattedColumns: Array<ColumnDef<RowData>> = columns.map(
      (column) => {
        return {
          header: column.name,
          accessorKey: column.key,
          cell: (props) => tableCell(props),
          meta: {
            type: column.type,
            width: column.width,
            align: column.align,
          } as ColumnMeta<object, string | number>,
        }
      },
    )

    if (selectableRow) {
      formattedColumns.unshift(selectableColumn)
    }

    setColumns(formattedColumns)
  }

  const getSelectedRows = () => {
    return table.getSelectedRowModel().flatRows.map((row) => row.original)
  }

  return (
    <Skeleton isLoaded={!isLoading} borderRadius="8px">
      <Box bg="#FBFBFB" pb={5} pt={2} px={2} borderRadius="lg" overflowX="auto">
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <S.Th
                      key={header.id}
                      width={header.column.columnDef.meta?.width}
                      onClick={header.column.getToggleSortingHandler()}
                      borderBottomColor="gray.300"
                      py={4}
                    >
                      <Flex justify={header.column.columnDef.meta?.align}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getIsSorted() ? (
                          <Box pl="4">
                            {header.column.getIsSorted() === 'desc' ? (
                              <TriangleDownIcon aria-label="sorted descending" />
                            ) : (
                              <TriangleUpIcon aria-label="sorted ascending" />
                            )}
                          </Box>
                        ) : null}
                      </Flex>
                    </S.Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row, index) => (
              <Tr key={row.id} bg="#FBFBFB">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <S.Td
                      key={cell.id}
                      color="gray.700"
                      borderBottomColor="gray.400"
                      p={4}
                    >
                      <Flex justify={cell.column.columnDef.meta?.align}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Flex>
                    </S.Td>
                  )
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Skeleton>
  )
}

export default DataTable
