import { Box, ActionIcon, Group, Badge, Avatar, Text } from '@mantine/core';
import { DataTable } from '../../components/common/DataTable';
import { PageHeader } from '../../components/common/PageHeader';
import { useAdvancedData } from '../../hooks/useAdvancedData';
import type { User } from '../../types';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

export function AdvancedTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [globalFilter, setGlobalFilter] = useState('');
  const [debouncedGlobalFilter] = useDebouncedValue(globalFilter, 500);

  const { data, isLoading, isFetching } = useAdvancedData({
    pageIndex: pagination.pageIndex,
    pageSize: pagination.pageSize,
    globalFilter: debouncedGlobalFilter,
  });

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: 'User',
        accessorKey: 'name',
        cell: ({ row }) => {
          const user = row.original;
          return (
            <Group gap="sm">
              <Avatar src={user.avatar} size={40} radius={40} />
              <div>
                <Text size="sm" fw={500}>{user.name}</Text>
                <Text c="dimmed" size="xs">{user.email}</Text>
              </div>
            </Group>
          );
        },
      },
      {
        header: 'Role',
        accessorKey: 'role',
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge
              color={status === 'ACTIVE' ? 'teal' : status === 'PENDING' ? 'yellow' : 'gray'}
              variant="light"
            >
              {status}
            </Badge>
          );
        },
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: () => (
          <Group gap={0}>
            <ActionIcon variant="subtle" color="gray">
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red">
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        ),
      },
    ],
    []
  );

  return (
    <Box>
      <PageHeader
        title="Advanced Data Table"
        breadcrumbs={[
          { title: 'Home', href: '/' },
          { title: 'Components', href: '#' },
          { title: 'Data Table', href: '/components/table' },
        ]}
      />

      <DataTable
        columns={columns}
        data={data?.rows ?? []}
        loading={isLoading}
        isFetching={isFetching}
        manualPagination={true}
        pageCount={data?.pageCount ?? -1}
        pagination={pagination}
        onPaginationChange={setPagination}
        globalFilter={globalFilter}
        onGlobalFilterChange={(value) => {
          setGlobalFilter(value);
          setPagination(prev => ({ ...prev, pageIndex: 0 })); // Reset page when searching
        }}
        totalRecords={data?.totalRows}
        enableExport
        exportFilename="advanced_table_data"
        exportData={data?.rows ?? []}
      />
    </Box>
  );
}
