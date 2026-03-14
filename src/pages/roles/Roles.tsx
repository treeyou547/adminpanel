import { Box, Card, Text, Group, Badge, Button, Grid, Avatar } from '@mantine/core';
import { PageHeader } from '../../components/common/PageHeader';
import { mockRoles } from '../../mock/data';
import { IconShieldLock } from '@tabler/icons-react';

export function Roles() {
  return (
    <Box>
      <PageHeader
        title="Roles & Permissions"
        breadcrumbs={[
          { title: 'Home', href: '/' },
          { title: 'Management', href: '/users' },
          { title: 'Roles', href: '/roles' },
        ]}
        withAction
        actionLabel="Create Role"
      />

      <Grid>
        {mockRoles.map((role) => (
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }} key={role.id}>
            <Card padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Text fw={500} size="lg">{role.name}</Text>
                <IconShieldLock size={20} color="var(--mantine-color-primary-6)" />
              </Group>
              <Text c="dimmed" size="sm" mb="md" style={{ minHeight: 40 }}>
                {role.description}
              </Text>

              <Text size="sm" fw={500} mb={8}>Permissions</Text>
              <Group gap={8} mb="xl">
                {role.permissions.map((perm) => (
                  <Badge key={perm} variant="light" size="sm">{perm}</Badge>
                ))}
              </Group>

              <Group justify="space-between" mt="md">
                <Group gap="xs">
                  <Avatar.Group spacing="sm">
                    <Avatar src="https://i.pravatar.cc/150?u=1" radius="xl" size="sm" />
                    <Avatar src="https://i.pravatar.cc/150?u=2" radius="xl" size="sm" />
                    <Avatar radius="xl" size="sm">+{role.usersCount}</Avatar>
                  </Avatar.Group>
                  <Text size="xs" c="dimmed">Users assigned</Text>
                </Group>
                <Button variant="light" size="xs">Edit Role</Button>
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
