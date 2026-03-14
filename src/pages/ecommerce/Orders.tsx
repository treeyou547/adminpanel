import { Box, Badge, ActionIcon, Group, Text } from '@mantine/core';
import { DataTable } from '../../components/common/DataTable';
import { PageHeader } from '../../components/common/PageHeader';
import { mockOrders } from '../../mock/data';
import type { Order } from '../../types';
import { IconEye, IconDownload } from '@tabler/icons-react';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export function Orders() {
  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        header: 'Order ID',
        accessorKey: 'id',
        cell: ({ row }) => <Text fw={600} size="sm">{row.original.id}</Text>,
      },
      {
        header: 'Customer',
        accessorKey: 'customer',
      },
      {
        header: 'Date',
        accessorKey: 'date',
      },
      {
        header: 'Total',
        accessorKey: 'total',
        cell: ({ row }) => <Text fw={500}>${row.original.total.toFixed(2)}</Text>,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const status = row.original.status;
          const colors = {
            DELIVERED: 'teal',
            SHIPPED: 'blue',
            PROCESSING: 'yellow',
            CANCELLED: 'red',
          };
          return (
            <Badge color={colors[status as keyof typeof colors]} variant="light">
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
              <IconEye size={16} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="gray">
              <IconDownload size={16} />
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
        title="Orders"
        breadcrumbs={[
          { title: 'Home', href: '/' },
          { title: 'E-Commerce', href: '/orders' },
          { title: 'Orders', href: '/orders' },
        ]}
        withAction
        actionLabel="Export CSV"
      />
      <DataTable columns={columns} data={mockOrders} />
    </Box>
  );
}
