import { Table, Group, Text, Pagination, Box, Loader, Center, Select, TextInput, LoadingOverlay, Menu, Button } from '@mantine/core';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';
import type { ColumnDef, SortingState, PaginationState } from '@tanstack/react-table';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch, IconDownload, IconFileSpreadsheet, IconFileText } from '@tabler/icons-react';
import { useState } from 'react';
import * as XLSX from 'xlsx';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  isFetching?: boolean;
  manualPagination?: boolean;
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: (updater: any) => void;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  totalRecords?: number;
  enableExport?: boolean;
  exportFilename?: string;
  exportData?: any[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  isFetching = false,
  manualPagination = false,
  pageCount = -1,
  pagination,
  onPaginationChange,
  globalFilter,
  onGlobalFilterChange,
  totalRecords,
  enableExport = false,
  exportFilename = 'export_data',
  exportData
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleExport = (format: 'csv' | 'xlsx') => {
    const dataToExport = exportData || data;
    if (!dataToExport || dataToExport.length === 0) return;

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    XLSX.writeFile(workbook, `${exportFilename}.${format}`);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      ...(pagination ? { pagination } : {}),
      ...(globalFilter !== undefined ? { globalFilter } : {})
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination,
    pageCount,
    onPaginationChange,
  });

  return (
    <Box bg="var(--mantine-color-body)" style={{ borderRadius: 'var(--mantine-radius-md)', border: '1px solid var(--mantine-color-default-border)', position: 'relative' }}>
      <LoadingOverlay visible={isFetching && !loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ color: 'primary', type: 'bars' }} />
      {(onGlobalFilterChange !== undefined || enableExport) && (
        <Group p="md" justify="space-between" style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}>
          {onGlobalFilterChange !== undefined ? (
            <TextInput
              placeholder="Search all columns..."
              value={globalFilter ?? ''}
              onChange={(e) => onGlobalFilterChange(e.currentTarget.value)}
              leftSection={<IconSearch size={16} />}
              w={{ base: '100%', sm: 300 }}
            />
          ) : <Box />}

          {enableExport && (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button variant="light" leftSection={<IconDownload size={16} />}>
                  Export
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconFileText size={14} />}
                  onClick={() => handleExport('csv')}
                >
                  Export as CSV
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconFileSpreadsheet size={14} />}
                  onClick={() => handleExport('xlsx')}
                >
                  Export as Excel
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>
      )}
      <Box style={{ overflowX: 'auto', padding: '16px' }}>
        <Table verticalSpacing="sm" horizontalSpacing="md" striped highlightOnHover>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.Th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                            style: { cursor: header.column.getCanSort() ? 'pointer' : 'default' }
                          }}
                        >
                          <Group gap={4} wrap="nowrap">
                            <Text size="sm" fw={600} c="dimmed">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </Text>
                            {{
                              asc: <IconChevronUp size={14} />,
                              desc: <IconChevronDown size={14} />,
                            }[header.column.getIsSorted() as string] ??
                              (header.column.getCanSort() ? (
                                <IconSelector size={14} style={{ opacity: 0.5 }} />
                              ) : null)}
                          </Group>
                        </div>
                      )}
                    </Table.Th>
                  );
                })}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {loading ? (
              <Table.Tr>
                <Table.Td colSpan={columns.length} style={{ height: 200 }}>
                  <Center h="100%">
                    <Loader color="primary" />
                  </Center>
                </Table.Td>
              </Table.Tr>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Tr
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td
                  colSpan={columns.length}
                  style={{ textAlign: 'center', height: 100 }}
                >
                  No results found.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>

      {/* Pagination */}
      {table.getPageCount() > 0 && (
        <Group justify="space-between" mt="md" px="md" pb="md" style={{ borderTop: '1px solid var(--mantine-color-default-border)', paddingTop: '16px' }} wrap="wrap">
          <Group>
            <Text size="sm" c="dimmed">
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </Text>
            {totalRecords !== undefined && (
              <Text size="sm" c="dimmed">
                ({totalRecords} total records)
              </Text>
            )}
          </Group>
          <Group>
            <Select
              data={['10', '20', '50', '100', '200']}
              value={table.getState().pagination.pageSize.toString()}
              onChange={(value) => table.setPageSize(Number(value))}
              size="sm"
              w={80}
            />
            <Pagination
              total={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={(page) => table.setPageIndex(page - 1)}
              color="primary"
              size="sm"
            />
          </Group>
        </Group>
      )}
    </Box>
  );
}
