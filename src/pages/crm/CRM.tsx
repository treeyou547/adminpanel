import { Box, Card, Grid, Text, Group, Avatar, Badge, Button, Title } from '@mantine/core';
import { PageHeader } from '../../components/common/PageHeader';
import { IconMail, IconPhoneCall } from '@tabler/icons-react';

const mockCustomers = [
  { id: 1, name: 'Google Inc.', contact: 'Sundar Pichai', email: 'contact@google.com', phone: '+1 800-123-4567', status: 'Active Client', type: 'Enterprise' },
  { id: 2, name: 'Acme Corp', contact: 'John Doe', email: 'john@acme.com', phone: '+1 555-019-2837', status: 'Lead', type: 'SMB' },
  { id: 3, name: 'Stark Industries', contact: 'Tony Stark', email: 'tony@stark.com', phone: '+1 800-IRON-MAN', status: 'In Negotiation', type: 'Enterprise' },
  { id: 4, name: 'Wayne Enterprises', contact: 'Bruce Wayne', email: 'bruce@wayne.com', phone: '+1 800-BAT-CAVE', status: 'Active Client', type: 'Enterprise' },
  { id: 5, name: 'Daily Planet', contact: 'Clark Kent', email: 'clark@dailyplanet.com', phone: '+1 555-SUPER', status: 'Lost', type: 'SMB' },
  { id: 6, name: 'Oscorp', contact: 'Norman Osborn', email: 'norman@oscorp.com', phone: '+1 555-GOBLIN', status: 'Lead', type: 'Enterprise' },
];

export function CRM() {
  return (
    <Box>
      <PageHeader
        title="CRM & Leads"
        breadcrumbs={[
          { title: 'Home', href: '/' },
          { title: 'E-Commerce', href: '/products' },
          { title: 'CRM', href: '/crm' },
        ]}
        withAction
        actionLabel="Add Lead"
      />

      <Grid>
        {mockCustomers.map((customer) => (
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }} key={customer.id}>
            <Card padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="md">
                <Badge variant="light" color={customer.status === 'Active Client' ? 'teal' : customer.status === 'Lead' ? 'blue' : customer.status === 'Lost' ? 'red' : 'yellow'}>
                  {customer.status}
                </Badge>
                <Badge variant="dot" color={customer.type === 'Enterprise' ? 'purple' : 'cyan'}>
                  {customer.type}
                </Badge>
              </Group>

              <Group gap="sm" mb="xl">
                <Avatar size="lg" radius="md" color="primary">{customer.name.charAt(0)}</Avatar>
                <div>
                  <Title order={4}>{customer.name}</Title>
                  <Text size="sm" c="dimmed">Contact: {customer.contact}</Text>
                </div>
              </Group>

              <Group gap={10} mb="xs">
                <IconMail size={16} stroke={1.5} color="var(--mantine-color-gray-6)" />
                <Text size="sm">{customer.email}</Text>
              </Group>

              <Group gap={10} mb="xl">
                <IconPhoneCall size={16} stroke={1.5} color="var(--mantine-color-gray-6)" />
                <Text size="sm">{customer.phone}</Text>
              </Group>

              <Button fullWidth variant="light">
                View Details
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
