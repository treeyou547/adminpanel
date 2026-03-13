import { useMemo } from 'react';
import { Title, Table, Paper, Text, Badge, Group } from '@mantine/core';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
};

const DUMMY_DATA: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Inactive' },
];

const columnHelper = createColumnHelper<User>();

export function Users() {
  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: info => <Text fw={500}>{info.getValue()}</Text>,
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
          const status = info.getValue();
          return (
            <Badge color={status === 'Active' ? 'green' : 'gray'} variant="light">
              {status}
            </Badge>
          );
        },
      }),
    ],
    []
  );

  const table = useReactTable({
    data: DUMMY_DATA,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Group justify="space-between" mb="md">
        <Title order={2}>Users</Title>
      </Group>

      <Paper withBorder shadow="sm" radius="md">
        <Table.ScrollContainer minWidth={500}>
          <Table striped highlightOnHover verticalSpacing="sm">
            <Table.Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.Th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </Table.Th>
                  ))}
                </Table.Tr>
              ))}
            </Table.Thead>
            <Table.Tbody>
              {table.getRowModel().rows.map((row) => (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Paper>
    </div>
  );
}
