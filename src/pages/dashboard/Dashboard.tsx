import { Grid, Text, Title, Badge, Group, Avatar, Box } from '@mantine/core';
import { PageHeader } from '../../components/common/PageHeader';
import { GlassCard } from '../../components/common/GlassCard';
import { AreaChart } from '@mantine/charts';
import { mockChartData, mockUsers } from '../../mock/data';
import { IconDotsVertical, IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';

const statData = [
  { title: 'Total Revenue', value: '$124,563.00', diff: 34, isPositive: true },
  { title: 'Active Users', value: '45,302', diff: 12, isPositive: true },
  { title: 'New Orders', value: '2,405', diff: -5, isPositive: false },
  { title: 'Conversion Rate', value: '4.35%', diff: 2, isPositive: true },
];

export function Dashboard() {
  return (
    <Box>
      <PageHeader
        title="Dashboard Overview"
        breadcrumbs={[
          { title: 'Home', href: '/' },
          { title: 'Dashboard', href: '/' },
        ]}
        withAction
        actionLabel="Download Report"
      />

      <Grid mb="xl">
        {statData.map((stat, i) => (
          <Grid.Col span={{ base: 12, sm: 6, lg: 3 }} key={i}>
            <GlassCard p="lg">
              <Group justify="space-between" mb="xs">
                <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                  {stat.title}
                </Text>
                <IconDotsVertical size={16} stroke={1.5} color="var(--mantine-color-gray-5)" />
              </Group>
              <Group align="flex-end" gap="xs">
                <Text size="xl" fw={700}>{stat.value}</Text>
                <Text c={stat.isPositive ? 'teal' : 'red'} size="sm" fw={500}>
                  <Group gap={4} wrap="nowrap">
                    {stat.isPositive ? <IconArrowUpRight size={16} /> : <IconArrowDownRight size={16} />}
                    <span>{Math.abs(stat.diff)}%</span>
                  </Group>
                </Text>
              </Group>
            </GlassCard>
          </Grid.Col>
        ))}
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <GlassCard p="xl">
            <Title order={3} mb="xl">Revenue Growth</Title>
            <AreaChart
              h={300}
              data={mockChartData}
              dataKey="date"
              series={[
                { name: 'revenue', color: 'primary.6' },
                { name: 'orders', color: 'teal.6' }
              ]}
              curveType="monotone"
            />
          </GlassCard>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <GlassCard p="xl" h="100%">
            <Title order={3} mb="xl">Recent Users</Title>
            {mockUsers.slice(0, 5).map(user => (
              <Group justify="space-between" mb="sm" key={user.id}>
                <Group>
                  <Avatar src={user.avatar} radius="xl" />
                  <div>
                    <Text size="sm" fw={500}>{user.name}</Text>
                    <Text size="xs" c="dimmed">{user.email}</Text>
                  </div>
                </Group>
                <Badge variant="light" color={user.status === 'ACTIVE' ? 'teal' : 'gray'}>
                  {user.status}
                </Badge>
              </Group>
            ))}
          </GlassCard>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
