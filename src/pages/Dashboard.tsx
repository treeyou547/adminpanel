import { SimpleGrid, Paper, Text, Group, ThemeIcon, Progress, Stack } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight, IconCoin, IconUserPlus, IconDiscount2, IconReceipt2 } from '@tabler/icons-react';

const statData = [
  { title: 'Revenue', icon: IconCoin, value: '$13,456', diff: 34, color: 'teal' },
  { title: 'New Users', icon: IconUserPlus, value: '4,145', diff: -13, color: 'red' },
  { title: 'Coupons Usage', icon: IconDiscount2, value: '745', diff: 18, color: 'blue' },
  { title: 'Orders', icon: IconReceipt2, value: '1,204', diff: 20, color: 'teal' },
];

export function Dashboard() {
  const stats = statData.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" color="dimmed" tt="uppercase" fw={700}>
            {stat.title}
          </Text>
          <ThemeIcon color={stat.color} variant="light" size={38} radius="md">
            <stat.icon size="1.5rem" stroke={1.5} />
          </ThemeIcon>
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text fz="xl" fw={700} lh={1}>{stat.value}</Text>
          <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} lh={1}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });

  return (
    <Stack gap="lg">
      <Text size="xl" fw={700}>Dashboard</Text>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
        {stats}
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, md: 2 }} mt="md">
        <Paper withBorder p="md" radius="md">
          <Text size="lg" fw={500} mb="md">Project Status</Text>
          <Stack gap="sm">
            <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm">Frontend Development</Text>
                <Text size="sm">75%</Text>
              </Group>
              <Progress value={75} color="blue" />
            </div>
            <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm">Backend API</Text>
                <Text size="sm">40%</Text>
              </Group>
              <Progress value={40} color="grape" />
            </div>
             <div>
              <Group justify="space-between" mb="xs">
                <Text size="sm">Database Design</Text>
                <Text size="sm">90%</Text>
              </Group>
              <Progress value={90} color="teal" />
            </div>
          </Stack>
        </Paper>
        <Paper withBorder p="md" radius="md">
           <Text size="lg" fw={500} mb="md">Recent Activity</Text>
           <Text size="sm" c="dimmed">No recent activity found.</Text>
        </Paper>
      </SimpleGrid>
    </Stack>
  );
}
