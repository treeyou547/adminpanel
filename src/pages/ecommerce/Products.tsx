import { Box, Badge, ActionIcon, Group, Text } from '@mantine/core';
import { DataTable } from '../../components/common/DataTable';
import { PageHeader } from '../../components/common/PageHeader';
import { mockProducts } from '../../mock/data';
import type { Product } from '../../types';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export function Products() {
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        header: 'Product Name',
        accessorKey: 'name',
        cell: ({ row }) => <Text fw={500}>{row.original.name}</Text>,
      },
      {
        header: 'Category',
        accessorKey: 'category',
      },
      {
        header: 'Price',
        accessorKey: 'price',
        cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
      },
      {
        header: 'Stock',
        accessorKey: 'stock',
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge
              color={status === 'IN_STOCK' ? 'teal' : status === 'LOW_STOCK' ? 'orange' : 'red'}
              variant="light"
            >
              {status.replace('_', ' ')}
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
        title="Products"
        breadcrumbs={[
          { title: 'Home', href: '/' },
          { title: 'E-Commerce', href: '/products' },
          { title: 'Products', href: '/products' },
        ]}
        withAction
        actionLabel="Add Product"
      />
      <DataTable columns={columns} data={mockProducts} />
    </Box>
  );
}
