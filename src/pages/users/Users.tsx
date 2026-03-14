import { useMemo } from 'react';
import { Title, Table, Paper, Text, Badge, Group, Avatar, ActionIcon } from '@mantine/core';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { IconEdit, IconTrash } from '@tabler/icons-react';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
};

const DUMMY_DATA: User[] = [
  { id: 'USR-001', name: 'John Doe', email: 'john@nexgen.com', role: 'Admin', status: 'Active' },
  { id: 'USR-002', name: 'Jane Smith', email: 'jane@nexgen.com', role: 'Editor', status: 'Active' },
  { id: 'USR-003', name: 'Bob Johnson', email: 'bob@nexgen.com', role: 'Viewer', status: 'Inactive' },
  { id: 'USR-004', name: 'Alice Williams', email: 'alice@nexgen.com', role: 'Editor', status: 'Active' },
  { id: 'USR-005', name: 'Charlie Brown', email: 'charlie@nexgen.com', role: 'Viewer', status: 'Inactive' },
];

const columnHelper = createColumnHelper<User>();

export function Users() {
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'User',
        cell: info => (
          <Group gap="sm">
            <Avatar color="blue" radius="xl">{info.getValue().charAt(0)}</Avatar>
            <div>
              <Text fw={500} size="sm">{info.getValue()}</Text>
              <Text size="xs" c="dimmed">{info.row.original.email}</Text>
            </div>
          </Group>
        ),
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: info => <Text size="sm">{info.getValue()}</Text>,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: info => {
          const status = info.getValue();
          return (
            <Badge color={status === 'Active' ? 'teal' : 'gray'} variant="light" size="sm">
              {status}
            </Badge>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: () => (
          <Group gap="xs">
            <ActionIcon variant="light" color="blue" size="sm"><IconEdit size="1rem" /></ActionIcon>
            <ActionIcon variant="light" color="red" size="sm"><IconTrash size="1rem" /></ActionIcon>
          </Group>
        ),
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
      <Group justify="space-between" mb="lg">
        <Title order={2}>User Management</Title>
      </Group>

      <Paper withBorder shadow="sm" radius="md">
        <Table.ScrollContainer minWidth={500}>
          <Table striped highlightOnHover verticalSpacing="sm">
            <Table.Thead bg="var(--mantine-color-gray-0)">
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